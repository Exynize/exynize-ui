import React from 'react';
import {RxState} from '../../stores/util';
import componentStore, {testComponent, createComponent} from '../../stores/component';
import codemirror from './codemirror/codemirror';
import analyseCode from './codemirror/codeanalysis';
import render from './template';

const defaultFunction = `export default (data) => {
    return Rx.Observable.return(\`\${data} => hello world!\`);
};
`;

const NewComponent = React.createClass({
    mixins: [RxState],
    stores: {
        testResult: componentStore.map(v => v.get('testResult').toJS())
            .filter(testResult => testResult !== undefined),
    },

    getInitialState() {
        const component = this.props.location.state.component || {
            source: defaultFunction,
        };
        // return
        return {
            id: component.id,
            code: component.source,
            name: component.name,
            description: component.description,
            codeAnalysis: {},
            testResult: {},
            createResult: {},
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
            codeAnalysis = {error: e.toString()};
        }
        this.setState({code, codeAnalysis});
    },
    handleName(e) {
        this.setState({name: e.target.value});
    },
    handleDescription(e) {
        this.setState({description: e.target.value});
    },

    testCode(e) {
        e.preventDefault();
        this.setState({testResult: {}});
        const args = this.state.codeAnalysis.testParams.map(name => this.refs[name].value);
        testComponent({
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

export default NewComponent;
