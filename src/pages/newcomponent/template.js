import React from 'react';
import {Row} from '../../components/bootstrap';

const render = function() {
    return (
        <Row size="12">
            <Row size="12">
                <h4>Component name:</h4>
                <input className="form-control" type="text" value={this.state.name} onChange={this.handleName} />
            </Row>
            <Row size="12">
                <h4>Component description:</h4>
                <textarea className="form-control" value={this.state.description} onChange={this.handleDescription} />
            </Row>
            <Row size="12">
                <h4>Component type: <small>{this.state.codeAnalysis.componentType}</small></h4>
            </Row>
            <Row size="12">
                <h3>Code:</h3>
                <textarea
                    ref="code"
                    className="form-control"
                    defaultValue={this.state.code} />
            </Row>
            <Row size="12">
                {this.state.codeAnalysis.error ? (
                    <div className="alert alert-danger">
                        {this.state.codeAnalysis.error}
                    </div>
                ) : ''}
                {this.state.codeAnalysis.testParams && this.state.codeAnalysis.testParams.length ? (
                    <div>
                        <h3>Test params:</h3>
                        {this.state.codeAnalysis.testParams.map((paramName, i) => (
                            <div className="input-group input-group-margined" key={'param_' + i}>
                                <span className="input-group-addon">
                                    {paramName}
                                </span>
                                <input
                                    ref={paramName}
                                    className="form-control"
                                    type="text"
                                    placeholder={paramName} />
                            </div>
                        ))}
                    </div>
                ) : ''}
            </Row>
            <Row size="12">
                <button className="btn btn-warning" onClick={this.testCode}>
                    Test
                </button>
                {this.state.testResult && this.state.testResult.ws ? (
                    <button className="btn btn-danger" onClick={this.stopTest}>
                        Stop test
                    </button>
                ) : ''}

                <button className="btn btn-primary pull-right" onClick={this.createComponent}>
                    {this.state.id ? 'Update' : 'Create'}
                </button>
                <button className="btn btn-warning pull-right" onClick={this.resetEditor}>
                    Reset editor
                </button>
            </Row>
            {this.state.testResult.error ? (
            <div className="alert alert-danger">
                <button className="close" onClick={this.resetTestResult}>
                    <span>&times;</span>
                </button>
                {this.state.testResult.error}
            </div>
            ) : ''}
            {this.state.testResult.resp ? (
            <Row size="12" key="testRes">
                <p>Test result:</p>
                {this.state.codeAnalysis.componentType === 'render' ? (
                    <div className="well">
                        <div dangerouslySetInnerHTML={{__html: this.state.testResult.resp[1]}} />
                    </div>
                ) : (
                    <pre>{JSON.stringify(this.state.testResult.resp, null, 4)}</pre>
                )}
            </Row>
            ) : ''}
        </Row>
    );
};

export default render;
