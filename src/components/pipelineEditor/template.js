import React from 'react';
import isEmpty from 'lodash/isEmpty';
import JSONTree from 'react-json-tree';
import renderSource from './source';
import renderProcessors from './processors';
import renderRendererComponent from './renderComponent';


const render = function() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                <div className="row">
                    <div className="col-xs-9">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Pipeline name"
                            value={this.state.name}
                            onChange={this.handleNameChange} />
                    </div>
                    <div className="col-xs-3">
                        <label className="component-toggle">
                            <input
                                type="checkbox"
                                checked={this.state.isPublic}
                                onChange={this.handlePublicChange} /> Public
                        </label>
                    </div>
                </div>
                <h5 className="padded-top-header">
                    Source component:&nbsp;
                    {!this.state.source ? (
                    <button className="btn btn-default btn-xs" onClick={this.handleSelectSourceComponent}>
                        <i className={'glyphicon glyphicon-' + (this.state.sourceComponentSelect ? 'minus' : 'plus')} />
                    </button>
                    ) : ''}
                </h5>
                {renderSource.call(this)}
                <h5 className="padded-top-header">
                    Processor components:&nbsp;
                    <button className="btn btn-default btn-xs" onClick={this.handleSelectProcessorComponents}>
                        <i className={'glyphicon glyphicon-' +
                            (this.state.processorComponentsSelect ? 'minus' : 'plus')} />
                    </button>
                </h5>
                {renderProcessors.call(this)}
                <h5 className="padded-top-header">
                    Render component:&nbsp;
                    {!this.state.render ? (
                    <button className="btn btn-default btn-xs" onClick={this.handleSelectRendererComponent}>
                        <i className={'glyphicon glyphicon-' +
                            (this.state.rendererComponentSelect ? 'minus' : 'plus')} />
                    </button>
                    ) : ''}
                </h5>
                {renderRendererComponent.call(this)}
                <div className="row row-margin-top">
                    <div className="col-xs-12">
                        {this.state.testResult && this.state.testResult.get('ws') ? (
                        <button className="btn btn-danger" onClick={this.stopTest}>
                            Stop test
                        </button>
                        ) : (
                        <button className="btn btn-warning" onClick={this.testPipeline}>
                            Test
                        </button>
                        )}

                        <button className="btn btn-primary pull-right" onClick={this.savePipeline}>
                            Save
                        </button>

                        {/* test error alert */}
                        {this.state.testResult && this.state.testResult.get('error') ? (
                        <div className="row-margin-top alert alert-danger">
                            <button className="close" onClick={this.resetTestResult}>
                                <span>&times;</span>
                            </button>
                            {!isEmpty(this.state.testResult.get('error')) ?
                                this.state.testResult.get('error') :
                                'Unknown error!'}
                        </div>
                        ) : ''}

                        {this.state.testResult && this.state.testResult.get('resp') ? (
                        <div className="row">
                            <p>Test result:</p>
                            <JSONTree data={this.state.testResult.get('resp')} />
                        </div>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default render;
