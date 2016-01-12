import React from 'react';
import {Link} from 'react-router';
import {apiUri} from '../../stores/config';
import {Modal} from '../../components/bootstrap';
import Component from '../../components/component';
import {RxState} from '../../stores/util';
import pipelineStore, {getPipelines, startPipeline, stopPipeline, getPipelineLog} from '../../stores/pipeline';
import authStore from '../../stores/auth';

const PipelinesCatalogue = React.createClass({
    mixins: [RxState],
    stores: {
        pipelines: pipelineStore.map(s => s.get('pipelines').toJS()),
        pipelineLog: pipelineStore.map(s => s.get('pipelineLog')),
        user: authStore.map(s => s.get('user').toJS()),
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
    showComponents(pipeline) {
        pipeline.showComponents = !pipeline.showComponents;
        this.forceUpdate();
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header page-header-slim">
                        <h4>Pipelines catalogue</h4>
                    </div>
                    {this.state.pipelines.map(p => (
                    <div className="row pipeline" key={'pipeline_' + p.id}>
                        <Link to={`/user/${p.user.username}`}
                            className={'user ' + (p.user.id === this.state.user.id ? 'user-self' : '')}>
                            @{p.user.username}
                        </Link>
                        &nbsp;/&nbsp;
                        <Link to={`/pipeline/${p.user.username}/${p.refName}`}
                            className="component">
                            {p.name}
                        </Link>
                        <span className={
                                'label label-' + (p.status === 'running' ? 'success' : 'default') +
                                ' btn-margin-left'
                            }>
                            Status: {p.status}
                        </span>
                        <a
                            className="btn btn-default btn-xs btn-margin-left"
                            href={`http://${apiUri}/api/pipes/${p.id}?token=${localStorage.getItem('auth.token')}`}>
                            <i className="glyphicon glyphicon-globe"></i> Web
                        </a>
                        <button
                            className="btn btn-default btn-xs btn-margin-left"
                            onClick={this.showLog.bind(this, p)}>
                            <i className="glyphicon glyphicon-file"></i> Log
                        </button>
                        <p>
                            <button
                                className="btn btn-default btn-xs"
                                onClick={this.showComponents.bind(this, p)}>
                                <i className={'glyphicon ' +
                                    (p.showComponents ? 'glyphicon-chevron-up' : 'glyphicon-chevron-down')}
                                /> Components
                            </button>
                        </p>
                        {p.showComponents ? (
                        <div className="row row-margin-bottom">
                            <div className="col-xs-6">
                                <Component {...p.source} short={true} authUser={this.state.user} />
                                <div className="glyphicon glyphicon-arrow-down row-separator" />
                                {p.components.map(c => (
                                    <div key={c.id}>
                                        <Component {...c} short={true} authUser={this.state.user} />
                                        <div className="glyphicon glyphicon-arrow-down row-separator" />
                                    </div>
                                ))}
                                <Component {...p.render} short={true} authUser={this.state.user} />
                            </div>
                        </div>
                        ) : ''}
                        <button className="btn btn-primary" onClick={this.startPipeline.bind(this, p)}>
                            Start
                        </button>
                        {p.status === 'running' ? (
                        <button className="btn btn-danger" onClick={this.stopPipeline.bind(this, p)}>
                            Stop
                        </button>
                        ) : ''}
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
                                    <div className="row" key={'logitem_' + item.id}>
                                        Data:
                                        <pre>{JSON.stringify(item.data, null, 4)}</pre>
                                        Added on: {item.added_on}
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </Modal>
                    ) : ''}
                </div>
            </div>
        );
    },
});

export default PipelinesCatalogue;
