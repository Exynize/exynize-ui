import esprima from 'esprima';
import {traverse} from 'estraverse';
import {transform} from 'babel-core';
import jsx from 'babel-plugin-transform-react-jsx';

// esprima options
const options = {
    sourceType: 'module',
};

const objectOfNamesAndTypes = (object: Object, names: Array<string>, types: Array<string>) => object &&
    names.indexOf(object.name) !== -1 && types.indexOf(object.type) !== -1;
const isReact = (object: Object) => objectOfNamesAndTypes(object, ['React'], ['Identifier']);

export default (code: string) => {
    const cleanCode = transform(code, {plugins: [jsx]});
    const ast = esprima.parse(cleanCode.code, options);
    const {body} = ast;
    const exports = body.filter(node => node.type === 'ExportDefaultDeclaration');
    const namedExports = body.filter(node => node.type === 'ExportNamedDeclaration');
    // validate that there's one default export
    if (exports.length === 0 || exports.length > 1) {
        throw new Error('Component should export only one default function!');
    }
    // validate that there's one export
    if (namedExports.length > 1) {
        throw new Error('Component should have not more than one named export!');
    }
    // get export
    const result = exports.pop();
    let {declaration} = result;

    // if we're looking at export of variable
    if (declaration.type === 'Identifier') {
        const vars = body
            .filter(node => node.type === 'VariableDeclaration')
            .filter(node => node.declarations
                .filter(dec => dec.id.name === declaration.name)
                .length > 0);
        // validate that it's declated
        if (!vars.length) {
            throw new Error('You must export an existing function!');
        }
        const fn = vars.pop();
        declaration = fn.declarations[0].init;
    }
    // validate that it's a function export
    if (declaration.type !== 'ArrowFunctionExpression' &&
        declaration.type !== 'FunctionDeclaration' &&
        declaration.type !== 'FunctionExpression'
    ) {
        throw new Error('You must export a function!');
    }

    // get params
    const {params} = declaration;
    // generate params
    const testParams = params.map(p => p.name);
    const finalParams = [...testParams];

    // check if it's input function
    let componentType = 'processor';
    // only do work if there are any params at all
    if (params.length > 0) {
        const lastParam = params[params.length - 1];
        // check named exports
        if (namedExports.length === 1 &&
            (
                (namedExports[0].declaration.id &&
                    namedExports[0].declaration.id.name === 'routeHandler') ||
                (namedExports[0].declaration.declarations &&
                    namedExports[0].declaration.declarations[0].id.name === 'routeHandler')
            )
        ) {
            componentType = 'source';
        } else {
            // only traverse to check for observable methods if not already source
            traverse(declaration, {
                enter(node) {
                    // check for onNext / onCompleted
                    if (node.type === 'CallExpression' &&
                        node.callee && node.callee.object && node.callee.property &&
                        objectOfNamesAndTypes(node.callee.object, [lastParam.name], [lastParam.type]) &&
                        objectOfNamesAndTypes(node.callee.property, ['onNext', 'onCompleted'], ['Identifier'])
                    ) {
                        componentType = 'source';
                    }
                }
            });
        }

        // remove last param from final
        // if it's source - it's observable
        // if it's processor - it's incoming data
        finalParams.pop();
        // remove last test param if it's source
        if (componentType === 'source') {
            testParams.pop();
        }
    } else { // check for render type
        traverse(declaration, {
            enter(node) {
                // check for react
                if ((
                    node.type === 'CallExpression' &&
                    node.callee && node.callee.object && node.callee.property &&
                    isReact(node.callee.object) &&
                    objectOfNamesAndTypes(node.callee.property, ['createClass', 'createElement'], ['Identifier'])
                ) || (
                    node.type === 'ClassDeclaration' &&
                    node.superClass &&
                    isReact(node.superClass.object) &&
                    objectOfNamesAndTypes(node.superClass.property, ['Component'], ['Identifier'])
                )) {
                    componentType = 'render';
                }
            }
        });
        // add test param if it's render
        if (componentType === 'render') {
            testParams.push('data');
        }
    }

    return {
        componentType,
        testParams,
        params: finalParams,
    };
};
