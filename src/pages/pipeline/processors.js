import React from 'react';
import {Row} from '../../components/bootstrap';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const processorComponentsSelector = function() {
    const comps = this.state.components
        .filter(c => c.type === 'processor')
        .filter(c => this.state.processors.indexOf(c) === -1);
    return renderComponentSelector.call(this, comps, this.handleProcessorComponent);
};

const processorsSelector = function() {
    if (this.state.processorComponentsSelect) {
        return processorComponentsSelector.call(this);
    }

    return (
        <button className="btn btn-default" onClick={this.handleSelectProcessorComponents}>
            Select processor components
        </button>
    );
};

const renderProcessors = function() {
    return (
        <Row size="12">
            <div className="well">
                {this.state.processors.length > 0 ?
                    this.state.processors.map(c =>
                        renderComponent.call(
                            this,
                            c,
                            this.handleProcessorComponentDeselect,
                            'Deselect'
                        )
                    ) :
                'No processors added yet'}
            </div>
            {processorsSelector.call(this)}
        </Row>
    );
};

export default renderProcessors;
