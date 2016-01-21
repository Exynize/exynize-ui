import React from 'react';
import uuid from 'node-uuid';
import semver from 'semver';
import {RxState} from '../../stores/util';
import componentStore, {testComponent, createComponent} from '../../stores/component';
import authStore from '../../stores/auth';
import codemirror from './codemirror/codemirror';
import analyseCode from './codemirror/codeanalysis';
import render from './template';

const defaultFunction = `export default (data) => {
    return Rx.Observable.return(\`\${data} => hello world!\`);
};
`;

const ComponentEditor = React.createClass({
    mixins: [RxState],

    stores: {
        authedUser: authStore.map(s => s.get('user').toJS()),
    },

    getDefaultProps() {
        return {
            name: 'My new component',
            description: 'My new component description',
            source: defaultFunction,
            version: '1.0.0',
            isPublic: false,
            isSourcePublic: false,
            user: {},
        };
    },

    getInitialState() {
        // get component from props
        const component = {...this.props};
        // generate test id
        component.testId = uuid.v4();

        // setup store with new testId
        this.stores.testResult = componentStore
            .map(v => v.get('testResult').toJS())
            .map(testResult => testResult[this.state.testId])
            .filter(testResult => testResult !== undefined);

        // return
        return {
            ...component,
            codeAnalysis: {},
            testResult: {},
            createResult: {},
            testExpanded: false,
            authedUser: {},
        };
    },

    componentWillReceiveProps(nextProps) {
        const isOwner = nextProps.user.id === 'new' || (nextProps.user.id === this.state.authedUser.id);
        this.setState({...nextProps, testResult: {}});
        if ((isOwner || nextProps.isSourcePublic) && this.editor) {
            this.editor.setValue(nextProps.source);
        }
    },

    componentDidMount() {
        this.createEditor();
    },
    componentDidUpdate() {
        this.createEditor();
    },

    createEditor() {
        const isOwner = this.state.user.id === 'new' || (this.state.user.id === this.state.authedUser.id);
        if (!this.editor && (this.state.isSourcePublic || isOwner)) {
            this.editor = codemirror.fromTextArea(this.refs.code, {
                lineNumbers: true,
                autofocus: true,
                indentUnit: 4,
                mode: 'javascript',
                extraKeys: {'Ctrl-Space': 'autocomplete'},
                value: this.state.source,
                readOnly: !isOwner,
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
        const source = this.editor.getValue();
        let codeAnalysis = {};
        try {
            codeAnalysis = analyseCode(source);
        } catch (e) {
            codeAnalysis = {
                ...this.state.codeAnalysis,
                error: e.toString(),
            };
        }
        this.setState({source, codeAnalysis});
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
    handlePublicChange(e) {
        this.setState({isPublic: e.target.checked});
    },
    handleSourcePublicChange(e) {
        this.setState({isSourcePublic: e.target.checked});
    },

    testCode(e) {
        e.preventDefault();
        this.setState({testResult: {}, testExpanded: true});
        const args = this.state.codeAnalysis.testParams.map(name => this.refs[name].value);
        const {source, testId} = this.state;
        testComponent({
            id: testId,
            args,
            source,
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
            source: this.state.source,
            params: this.state.codeAnalysis.params,
            type: this.state.codeAnalysis.componentType,
            isPublic: this.state.isPublic,
            isSourcePublic: this.state.isSourcePublic,
        };
        if (this.state.id) {
            comp.id = this.state.id;
        }
        createComponent(comp);
    },

    render,
});

export default ComponentEditor;
