import React from 'react';

const render = function() {
    return (
        <div className="row">
            <div className="col-xs-6 col-xs-offset-2 component-header">
                <div className="input-group">
                    {/* component type */}
                    <span className="input-group-addon">
                        <span className="label label-info">
                            {this.state.codeAnalysis.componentType ?
                                this.state.codeAnalysis.componentType :
                                'unknown'}
                        </span>
                    </span>
                    {/* component name */}
                    <input className="form-control" type="text" id="componentName"
                        value={this.state.name} onChange={this.handleName}
                        placeholder="Component name"/>

                    {/* main action buttons (save / clear) */}
                    <div className="input-group-btn">
                        <button className="btn btn-default"
                            onClick={this.createComponent}
                            title={this.state.id ? 'Update' : 'Save'}>
                            <i className="glyphicon glyphicon-save"></i> Save
                        </button>
                        {/*<button className="btn btn-default"
                            onClick={this.resetEditor}
                            title="Reset editor">
                            <i className="glyphicon glyphicon-remove"></i>
                        </button>*/}
                    </div>
                </div>
            </div>

            <div className="col-xs-3">
                {/* component version */}
                <input className="form-control version-input" type="text" id="componentVersion"
                    value={this.state.version} onChange={this.handleVersion}
                    placeholder="Component version"/>
                <label className="component-toggle">
                    <input
                        type="checkbox"
                        checked={this.state.isPublic}
                        onChange={this.handlePublicChange} /> Public
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={this.state.isSourcePublic}
                        onChange={this.handleSourcePublicChange} /> Source public
                </label>
                {this.state.versionError ? (
                    <p className="text-danger input-error-text">{this.state.versionError}</p>
                ) : ''}
            </div>

            {/* main area */}
            <div className="col-xs-6 col-xs-offset-2">
                {/* component code */}
                <textarea
                    ref="code"
                    className="form-control"
                    defaultValue={this.state.source} />

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
                        onChange={this.handleDescription} />
                </div>

                {/* function parameters for testing */}
                <div className="row">
                    {this.state.codeAnalysis.testParams && this.state.codeAnalysis.testParams.length ? (
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
                {this.state.codeAnalysis.error ? '' : (
                <div className="row row-margin-top">
                    <button className="btn btn-warning" onClick={this.testCode}>
                        Test
                    </button>
                    {this.state.testResult && this.state.testResult.ws ? (
                        <button className="btn btn-danger btn-margin-left" onClick={this.stopTest}>
                            Stop test
                        </button>
                    ) : ''}
                </div>
                )}

                {/* test result expand/collapse control */}
                <div className="row row-margin-top">
                    <button
                        className="btn btn-xs btn-default btn-noshadow btn-normal-case"
                        onClick={this.toggleTestResults}>
                        <i className={'glyphicon glyphicon-chevron-' + (this.state.testExpanded ? 'up' : 'down')} />
                        &nbsp;{this.state.testExpanded ? 'Hide' : 'Show'} test results
                    </button>
                </div>

                {/* test results */}
                {this.state.testExpanded ? (
                <div className="row row-margin-top">
                    {/* test error alert */}
                    {this.state.testResult.error ? (
                    <div className="alert alert-danger">
                        <button className="close" onClick={this.resetTestResult}>
                            <span>&times;</span>
                        </button>
                        {this.state.testResult.error}
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
                            <pre className="testResults">{JSON.stringify(this.state.testResult.resp, null, 4)}</pre>
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
