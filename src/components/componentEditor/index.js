import React from 'react';
import uuid from 'node-uuid';
import semver from 'semver';
import {RxState} from '../../stores/util';
import componentStore, {testComponent, createComponent} from '../../stores/component';
import codemirror from './codemirror/codemirror';
import analyseCode from './codemirror/codeanalysis';
import render from './template';

const defaultFunction = `export default (data) => {
    return Rx.Observable.return(\`\${data} => hello world!\`);
};
`;

const ComponentEditor = React.createClass({
    mixins: [RxState],

    getDefaultProps() {
        return {
            component: {
                name: 'My new component',
                description: 'My new component description',
                source: defaultFunction,
                version: '1.0.0',
                isPublic: false,
                isSourcePublic: false,
            },
        };
    },

    getInitialState() {
        // get component from props
        const component = this.props.component;
        // generate test id
        component.testId = uuid.v4();

        // setup store with new testId
        this.stores = {
            testResult: componentStore.map(v => v.get('testResult').toJS())
                .map(testResult => testResult[this.state.testId])
                .filter(testResult => testResult !== undefined),
        };

        // return
        return {
            ...component,
            codeAnalysis: {},
            testResult: {},
            createResult: {},
            testExpanded: false,
        };
    },

    componentDidMount() {
        if (!this.editor) {
            this.editor = codemirror.fromTextArea(this.refs.code, {
                lineNumbers: true,
                autofocus: true,
                indentUnit: 4,
                mode: 'javascript',
                extraKeys: {'Ctrl-Space': 'autocomplete'},
                value: this.state.code,
            });
            this.editor.on('change', this.handleCodeChange);
            this.handleCodeChange();
        }
    },

    toggleTestResults() {
        this.setState({testExpanded: !this.state.testExpanded});
    },

    resetEditor() {
        this.setState({
            name: '',
            description: '',
            testResult: {},
        });
        this.editor.setValue(defaultFunction);
    },

    handleCodeChange() {
        const code = this.editor.getValue();
        let codeAnalysis = {};
        try {
            codeAnalysis = analyseCode(code);
        } catch (e) {
            codeAnalysis = {
                ...this.state.codeAnalysis,
                error: e.toString(),
            };
        }
        this.setState({code, codeAnalysis});
    },
    handleName(e) {
        this.setState({name: e.target.value});
    },
    handleVersion(e) {
        const version = e.target.value;
        if (semver.valid(version)) {
            this.setState({version, versionError: ''});
        } else {
            this.setState({version, versionError: 'Version number must follow semantic versioning!'});
        }
    },
    handleDescription(e) {
        this.setState({description: e.target.value});
    },

    testCode(e) {
        e.preventDefault();
        this.setState({testResult: {}, testExpanded: true});
        const args = this.state.codeAnalysis.testParams.map(name => this.refs[name].value);
        const {testId} = this.state;
        testComponent({
            id: testId,
            args,
            source: this.state.code,
            componentType: this.state.codeAnalysis.componentType,
        });
    },
    stopTest(e) {
        e.preventDefault();
        this.state.testResult.ws.send(JSON.stringify({end: true}));
        this.setState({testResult: {}});
    },

    resetCreateResult(e) {
        e.preventDefault();
        this.setState({createResult: {}});
    },
    resetTestResult(e) {
        e.preventDefault();
        this.setState({testResult: {}});
    },

    createComponent(e) {
        e.preventDefault();
        const comp = {
            name: this.state.name,
            description: this.state.description,
            version: this.state.version,
            source: this.state.code,
            params: this.state.codeAnalysis.params,
            type: this.state.codeAnalysis.componentType,
            isPublic: true,
            isSourcePublic: true,
        };
        if (this.state.id) {
            comp.id = this.state.id;
        }
        createComponent(comp);
    },

    render,
});

export default ComponentEditor;
