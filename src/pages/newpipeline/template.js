import React from 'react';
import {Row} from '../../components/bootstrap';
import renderSource from './source';
import renderProcessors from './processors';
import renderRendererComponent from './renderComponent';

const render = function() {
    return (
        <Row size="12">
            <h2>Pipeline name:</h2>
            <input className="form-control" type="text" value={this.state.name} onChange={this.handleNameChange} />
            <h2>Source component:</h2>
            {renderSource.call(this)}
            <h2>Processor components:</h2>
            {renderProcessors.call(this)}
            <h2>Render component:</h2>
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
        </Row>
    );
};

export default render;
