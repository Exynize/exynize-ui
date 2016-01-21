import React from 'react';
import {fromJS} from 'immutable';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';
import pipelineStore, {testPipeline, createPipeline} from '../../stores/pipeline';
import authStore from '../../stores/auth';
import render from './template';

const PipelineEditor = React.createClass({
    mixins: [RxState],
    stores: {
        allComponents: componentStore.map(s => s.get('components').toJS()),
        testResult: pipelineStore.map(s => s.get('testResult')),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getDefaultProps() {
        return {
            name: 'My new pipeline',
            source: null,
            components: [],
            render: null,
            isPublic: false,
            isSourcePublic: false,
        };
    },

    getInitialState() {
        const pipeline = {...this.props};
        // request components
        getComponents();
        // process params
        const adjustParams = (c) => {
            c.paramValues = {};
            c.params.forEach((paramName, i) => c.paramValues[paramName] = c.args[i]);
            return c;
        };
        if (pipeline.source) {
            pipeline.source = adjustParams(pipeline.source);
        }
        if (pipeline.render) {
            pipeline.render = adjustParams(pipeline.render);
        }
        // return
        return {
            ...pipeline,
            sourceComponentSelect: false,
            processorComponentsSelect: false,
            rendererComponentSelect: false,
            testResult: fromJS({}),
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps});
    },

    handleSelectSourceComponent() {
        this.setState({sourceComponentSelect: true});
    },
    handleSelectProcessorComponents() {
        this.setState({processorComponentsSelect: true});
    },
    handleSelectRendererComponent() {
        this.setState({rendererComponentSelect: true});
    },
    handleSourceToggle(comp) {
        comp.showSource = !comp.showSource;
        this.forceUpdate();
    },

    handleSourceComponent(source) {
        this.setState({source, sourceComponentSelect: false});
    },
    handleRendererComponent(renderComponent) {
        // TODO: put back to setState once react-hmr bug is fixed
        const s = {render: renderComponent, rendererComponentSelect: false};
        this.setState(s);
    },
    handleProcessorComponent(component) {
        const components = this.state.components.concat([component]);
        this.setState({components});
    },
    handleProcessorComponentDeselect(component) {
        const components = this.state.components.filter(c => c !== component);
        this.setState({components});
    },
    handleParamChange(component, paramName, e) {
        if (!component.paramValues) {
            component.paramValues = {};
        }
        component.paramValues[paramName] = e.target.value;
    },
    handleNameChange(e) {
        this.setState({name: e.target.value});
    },

    testPipeline(e) {
        e.preventDefault();
        const components = this.state.components.map(
            ({id, isSourcePublic, source, params = [], paramValues = {}}) => ({
                id: !isSourcePublic || !source ? id : undefined,
                source,
                args: params.map(name => paramValues[name]),
            })
        );
        const pipeline = {
            source: {
                source: this.state.source.source,
                args: this.state.source.params.map(name => this.state.source.paramValues[name]),
            },
            components,
        };
        testPipeline({pipeline: JSON.stringify(pipeline)});
    },
    stopTest(e) {
        e.preventDefault();
        this.state.testResult.get('ws').send(JSON.stringify({end: true}));
        this.setState({testResult: fromJS({})});
    },

    savePipeline(e) {
        e.preventDefault();
        const components = this.state.components.map(({id, params = [], paramValues = {}}) => ({
            id,
            args: params.map(name => paramValues[name]),
        }));
        const pipeline = {
            source: {
                id: this.state.source.id,
                args: this.state.source.params.map(name => this.state.source.paramValues[name]),
            },
            components,
            render: {
                id: this.state.render ? this.state.render.id : '-1',
            },
            name: this.state.name,
            isPublic: true,
        };
        if (this.state.id) {
            pipeline.id = this.state.id;
        }
        createPipeline(pipeline);
    },

    isOwner() {
        return this.state.user && this.state.authedUser &&
            this.state.user.id === this.state.authedUser.id;
    },

    render,
});

export default PipelineEditor;
