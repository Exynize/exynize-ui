import React from 'react';
import renderSource from './source';
import renderProcessors from './processors';
import renderRendererComponent from './renderComponent';

const render = function() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Pipeline name"
                    value={this.state.name}
                    onChange={this.handleNameChange} />
                <h5 className="padded-top-header">Source component:</h5>
                {renderSource.call(this)}
                <h5 className="padded-top-header">Processor components:</h5>
                {renderProcessors.call(this)}
                <h5 className="padded-top-header">Render component:</h5>
                {renderRendererComponent.call(this)}
                <div className="row row-margin-top">
                    <div className="col-xs-12">
                        <button className="btn btn-warning" onClick={this.testPipeline}>
                            Test
                        </button>
                        {this.state.testResult && this.state.testResult.get('ws') ? (
                        <button className="btn btn-danger" onClick={this.stopTest}>
                            Stop test
                        </button>
                        ) : ''}

                        <button className="btn btn-primary pull-right" onClick={this.savePipeline}>
                            Save
                        </button>

                        {this.state.testResult && this.state.testResult.get('resp') ? (
                        <div className="row" key="testRes">
                            <p>Test result:</p>
                            <pre>{JSON.stringify(this.state.testResult.get('resp'), null, 4)}</pre>
                        </div>
                        ) : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default render;
