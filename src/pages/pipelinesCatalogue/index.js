import React from 'react';
import {History} from 'react-router';
import {apiUri} from '../../stores/config';
import {Row, Modal} from '../../components/bootstrap';
import {RxState} from '../../stores/util';
import pipelineStore, {getPipelines, startPipeline, stopPipeline, getPipelineLog} from '../../stores/pipeline';

const PipelinesCatalogue = React.createClass({
    mixins: [History, RxState],
    stores: {
        pipelines: pipelineStore.map(s => s.get('pipelines')),
        pipelineLog: pipelineStore.map(s => s.get('pipelineLog')),
    },

    getInitialState() {
        getPipelines();
        return {
            pipelines: [],
            pipelineLog: null,
        };
    },

    startPipeline(pipeline) {
        startPipeline(pipeline);
    },
    stopPipeline(pipeline) {
        stopPipeline(pipeline);
    },

    showLog(pipeline) {
        getPipelineLog(pipeline);
    },
    closePipelineLog() {
        this.setState({pipelineLog: null});
    },

    editPipeline(pipeline) {
        this.history.pushState({pipeline}, '/newpipeline');
    },

    render() {
        return (
            <Row size="12">
                <h2>Pipelines catalogue:</h2>
                {this.state.pipelines.map(p => p.toJS()).map(p => (
                    <div className="well" key={'pipeline_' + p.id}>
                        <h3>
                            <small>Name:</small>
                            <a href={`http://${apiUri}/api/pipes/${p.id}?token=${localStorage.getItem('auth.token')}`}>
                                {p.name}
                            </a>
                        </h3>
                        <Row size="12">
                            <span className={'label label-' + (p.status === 'running' ? 'success' : 'default')}>
                                Status: {p.status}
                            </span>
                            <button className="btn btn-info btn-xs" onClick={this.showLog.bind(this, p)}>
                                Show log
                            </button>
                        </Row>
                        <h5>Included components:</h5>
                        {p.components.map(c => (
                            <Row size="12" key={'component_' + c.id}>
                                <h4>{c.name} <small className="label label-default">{c.type}</small></h4>
                                <small>{c.description}</small>
                            </Row>
                        ))}
                        <button className="btn btn-primary" onClick={this.startPipeline.bind(this, p)}>
                            Start
                        </button>
                        {p.status === 'running' ? (
                            <button className="btn btn-danger" onClick={this.stopPipeline.bind(this, p)}>
                                Stop
                            </button>
                        ) : ''}
                        <button className="btn btn-warning pull-right" onClick={this.editPipeline.bind(this, p)}>
                            Edit
                        </button>
                    </div>
                ))}

                {this.state.pipelineLog ? (
                    <Modal title="Pipeline log" onClose={this.closePipelineLog}>
                        {this.state.pipelineLog.map(g => g.toJS()).map(group => (
                            <div className="panel panel-default" key={'loggroup_' + group.group}>
                                <div className="panel-heading">
                                    Session Id: {group.group}
                                </div>
                                <div className="panel-body">
                                {group.reduction.map(item => (
                                    <Row size="12" key={'logitem_' + item.id}>
                                        Data:
                                        <pre>{JSON.stringify(item.data, null, 4)}</pre>
                                        Added on: {item.added_on}
                                    </Row>
                                ))}
                                </div>
                            </div>
                        ))}
                    </Modal>
                ) : ''}
            </Row>
        );
    },
});

export default PipelinesCatalogue;
