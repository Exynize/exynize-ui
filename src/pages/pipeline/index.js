import React from 'react';
import {RxState} from '../../stores/util';
import PipelineEditor from '../../components/pipelineEditor';
import pipelineStore, {getPipeline} from '../../stores/pipeline';

const Pipeline = React.createClass({
    mixins: [RxState],
    stores: {
        pipeline: pipelineStore.map(s => s.get('pipeline').toJS()),
    },

    getInitialState() {
        let pipeline = this.props.location.state ? this.props.location.state.pipeline : undefined;
        // clear if new route
        if (this.props.params.user === 'new') {
            pipeline = undefined;
        }
        // if user and component name present - get component from server
        if (this.props.params.user && this.props.params.pipeline) {
            pipeline = undefined;
            this.getPipeline(this.props.params);
        }
        // return
        return {
            pipeline,
        };
    },

    getPipeline({user, pipeline}) {
        getPipeline({user, pipeline});
    },

    render() {
        return <PipelineEditor {...this.state.pipeline} />;
    },
});

export default Pipeline;
