import React from 'react';
import {RxState} from '../../stores/util';
import PipelineEditor from '../../components/pipelineEditor';
import pipelineStore, {getPipeline} from '../../stores/pipeline';

const Pipeline = React.createClass({
    mixins: [RxState],
    stores: {
        pipeline: pipelineStore
            .map(s => s.get('pipeline'))
            .filter(c => c.count() > 0) // only work with non-null pipelines
            .distinctUntilChanged() // only update when pipleine changed
            .map(s => s.toJS()),
    },

    getInitialState() {
        // trigger initial component load
        this.updatePipeline(this.props);
        // return
        return {
            pipeline: undefined,
        };
    },

    componentWillReceiveProps(nextProps) {
        this.updateComponent(nextProps);
    },

    updatePipeline(props) {
        // clear if new route
        if (props.params.user === 'new') {
            return;
        }
        // if user and component name present - get component from server
        if (props.params.user && props.params.component) {
            this.getPipeline(props.params);
        }
    },


    getPipeline({user, pipeline}) {
        getPipeline({user, pipeline});
    },

    render() {
        return <PipelineEditor {...this.state.pipeline} />;
    },
});

export default Pipeline;
