import React from 'react';
import {RxState} from '../../stores/util';
import PipelineEditor from '../../components/pipelineEditor';
import pipelineStore, {getPipeline, newPipeline} from '../../stores/pipeline';

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
        this.updatePipeline(nextProps);
    },

    updatePipeline(props) {
        // clear if new route
        if (props.params.user === 'new') {
            newPipeline();
            return;
        }
        // if user and component name present - get component from server
        if (props.params.user && props.params.pipeline) {
            this.getPipeline(props.params);
        }
    },


    getPipeline({user, pipeline}) {
        getPipeline({user, pipeline});
    },

    render() {
        if (this.state.pipeline && this.state.pipeline.error) {
            return (
                <div className="row">
                    <div className="col-xs-6 col-xs-offset-3 text-center">
                        <h4>{this.state.pipeline.error === 'Forbidden' ? (
                            `Looks like you don't have rights to see this!`
                        ) : this.state.pipeline.error}</h4>
                    </div>
                </div>
            );
        }

        return <PipelineEditor {...this.state.pipeline} />;
    },
});

export default Pipeline;
