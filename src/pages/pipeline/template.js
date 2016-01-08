import React from 'react';
import {Row} from '../../components/bootstrap';
import renderSource from './source';
import renderProcessors from './processors';
import renderRendererComponent from './renderComponent';

const render = function() {
    return (
        <div className="row">
            <div className="col-xs-8 col-xs-offset-2">
                <h4>Pipeline name:</h4>
                <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
                <h4>Source component:</h4>
                {renderSource.call(this)}
                <h4>Processor components:</h4>
                {renderProcessors.call(this)}
                <h4>Render component:</h4>
                {renderRendererComponent.call(this)}
                <Row size="12">
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
                    <Row size="12" key="testRes">
                        <p>Test result:</p>
                        <pre>{JSON.stringify(this.state.testResult.get('resp'), null, 4)}</pre>
                    </Row>
                    ) : ''}
                </Row>
            </div>
        </div>
    );
};

export default render;
