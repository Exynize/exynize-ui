import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const processorComponentsSelector = function() {
    const comps = this.state.allComponents
        .filter(c => c.type === 'processor')
        .filter(c => this.state.components.filter(sc => sc.id === c.id).length === 0);
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
        <div className="row">
            <div className="col-xs-12">
                <div className="well row">
                    <div className="col-xs-12">
                    {this.state.components.length > 0 ?
                        this.state.components.map(c =>
                            renderComponent.call(
                                this,
                                c,
                                this.handleProcessorComponentDeselect,
                                'Deselect'
                            )
                        ) :
                    'No processors added yet'}
                    </div>
                </div>
            {processorsSelector.call(this)}
            </div>
        </div>
    );
};

export default renderProcessors;
