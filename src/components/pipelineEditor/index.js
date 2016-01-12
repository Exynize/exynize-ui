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
        components: componentStore.map(s => s.get('components').toJS()),
        testResult: pipelineStore.map(s => s.get('testResult')),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getDefaultProps() {
        return {
            name: 'My new pipeline',
            source: null,
            components: [],
            renderComponent: null,
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
            id: pipeline.id,
            name: pipeline.name,
            sourceComponent: pipeline.source,
            sourceComponentSelect: false,
            processors: pipeline.components.map(adjustParams),
            processorComponentsSelect: false,
            rendererComponent: pipeline.render,
            rendererComponentSelect: false,
            testResult: fromJS({}),
        };
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

    handleSourceComponent(sourceComponent) {
        this.setState({sourceComponent, sourceComponentSelect: false});
    },
    handleRendererComponent(rendererComponent) {
        this.setState({rendererComponent, rendererComponentSelect: false});
    },
    handleProcessorComponent(component) {
        const processors = this.state.processors.concat([component]);
        this.setState({processors});
    },
    handleProcessorComponentDeselect(component) {
        const processors = this.state.processors.filter(c => c !== component);
        this.setState({processors});
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
        const components = this.state.processors.map(
            ({source, params = [], paramValues = {}}) => ({
                source,
                args: params.map(name => paramValues[name]),
            })
        );
        const pipeline = {
            source: {
                source: this.state.sourceComponent.source,
                args: this.state.sourceComponent.params.map(name => this.state.sourceComponent.paramValues[name]),
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
        const components = this.state.processors.map(({id, params = [], paramValues = {}}) => ({
            id,
            args: params.map(name => paramValues[name]),
        }));
        const pipeline = {
            source: {
                id: this.state.sourceComponent.id,
                args: this.state.sourceComponent.params.map(name => this.state.sourceComponent.paramValues[name]),
            },
            components,
            render: {
                id: this.state.rendererComponent ? this.state.rendererComponent.id : '-1',
            },
            name: this.state.name,
            isPublic: true,
        };
        if (this.state.id) {
            pipeline.id = this.state.id;
        }
        createPipeline(pipeline);
    },

    render,
});

export default PipelineEditor;
