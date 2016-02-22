import React from 'react';
import isEmpty from 'lodash/isEmpty';
import JSONTree from 'react-json-tree';

const render = function() {
    const isOwner = this.state.user.id === 'new' || (this.state.user.id === this.state.authedUser.id);
    return (
        <div className="row">
            <div className="col-xs-6 col-xs-offset-2 component-header">
                <div className="input-group">
                    {/* component type */}
                    <span className="input-group-addon">
                        {isOwner ? (
                        <span className="label label-info">
                            {this.state.codeAnalysis.componentType ?
                                this.state.codeAnalysis.componentType :
                                'unknown'}
                        </span>
                        ) : (
                        <span className="label label-primary">
                            {this.state.type}
                        </span>
                        )}
                    </span>
                    {/* component name */}
                    <input className="form-control" type="text" id="componentName"
                        value={this.state.name} onChange={this.handleName}
                        placeholder="Component name"
                        disabled={!isOwner} />

                    {/* main action buttons (save / clear) */}
                    {isOwner ? (
                    <div className="input-group-btn">
                        <button className="btn btn-default"
                            onClick={this.createComponent}
                            title={this.state.id ? 'Update' : 'Save'}>
                            <i className="glyphicon glyphicon-save"></i> Save
                        </button>
                    </div>
                    ) : ''}
                </div>
            </div>

            <div className="col-xs-3">
                {/* component version */}
                <input className="form-control version-input" type="text" id="componentVersion"
                    value={this.state.version} onChange={this.handleVersion}
                    placeholder="Component version"
                    disabled={!isOwner} />
                <label className="component-toggle">
                    <input
                        type="checkbox"
                        checked={this.state.isPublic}
                        onChange={this.handlePublicChange}
                        disabled={!isOwner} /> Public
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.isSourcePublic}
                        onChange={this.handleSourcePublicChange}
                        disabled={!isOwner} /> Source public
                </label>
                {this.state.versionError ? (
                    <p className="text-danger input-error-text">{this.state.versionError}</p>
                ) : ''}
            </div>

            {/* main area */}
            <div className="col-xs-6 col-xs-offset-2">
                {/* component code */}
                {isOwner || this.state.isSourcePublic ? (
                <textarea
                    ref="code"
                    className="form-control"
                    defaultValue={this.state.source} />
                ) : (
                <div className="text-center">This component's source is private</div>
                )}

                {/* linter/code errors */}
                <div className="row">
                    {this.state.codeAnalysis.error ? (
                        <div className="alert alert-danger">
                            {this.state.codeAnalysis.error}
                        </div>
                    ) : ''}
                </div>
            </div>

            {/* sidebar */}
            <div className="col-xs-3">
                {/* description */}
                <div className="row">
                    <h5>Component description:</h5>
                    <textarea
                        className="form-control"
                        placeholder="Enter component description..."
                        value={this.state.description}
                        onChange={this.handleDescription}
                        disabled={!isOwner} />
                </div>

                {/* function parameters for testing */}
                <div className="row">
                    {isOwner && this.state.codeAnalysis.testParams && this.state.codeAnalysis.testParams.length ? (
                        <div>
                            <h5>Test params:</h5>
                            {this.state.codeAnalysis.testParams.map((paramName, i) => (
                                <div className="input-group input-group-margined" key={'param_' + i}>
                                    <span className="input-group-addon">
                                        {paramName}
                                    </span>
                                    <input
                                        ref={paramName}
                                        className="form-control"
                                        type="text"
                                        placeholder={`test value for "${paramName}"`} />
                                </div>
                            ))}
                        </div>
                    ) : ''}
                </div>

                {/* test buttons */}
                {!isOwner || this.state.codeAnalysis.error ? '' : (
                <div className="row row-margin-top">
                    {this.state.testResult && this.state.testResult.ws ? (
                        <button className="btn btn-danger btn-margin-left" onClick={this.stopTest}>
                            Stop test
                        </button>
                    ) : (
                        <button className="btn btn-warning" onClick={this.testCode}>
                            Test
                        </button>
                    )}
                </div>
                )}

                {/* test result expand/collapse control */}
                {isOwner ? (
                <div className="row row-margin-top">
                    <button
                        className="btn btn-xs btn-default btn-noshadow btn-normal-case"
                        onClick={this.toggleTestResults}>
                        <i className={'glyphicon glyphicon-chevron-' + (this.state.testExpanded ? 'up' : 'down')} />
                        &nbsp;{this.state.testExpanded ? 'Hide' : 'Show'} test results
                    </button>
                </div>
                ) : ''}

                {/* test results */}
                {isOwner && this.state.testExpanded ? (
                <div className="row row-margin-top">
                    {/* test error alert */}
                    {this.state.testResult.error ? (
                    <div className="alert alert-danger">
                        <button className="close" onClick={this.resetTestResult}>
                            <span>&times;</span>
                        </button>
                        {this.state.testResult.error && !isEmpty(this.state.testResult.error) ?
                            this.state.testResult.error :
                            'Unknown error!'}
                    </div>
                    ) : ''}

                    {/* test results output */}
                    {this.state.testResult.resp ? (
                    <div key="testRes">
                        <h4>Test result:</h4>
                        {this.state.codeAnalysis.componentType === 'render' ? (
                            <div className="well">
                                <div dangerouslySetInnerHTML={{__html: this.state.testResult.resp[1]}} />
                            </div>
                        ) : (
                            <div className="testResults">
                                <JSONTree data={this.state.testResult.resp} />
                            </div>
                        )}
                    </div>
                    ) : (
                        <h5>No test results yet...</h5>
                    )}
                </div>) : ''}
            </div>
        </div>
    );
};

export default render;
