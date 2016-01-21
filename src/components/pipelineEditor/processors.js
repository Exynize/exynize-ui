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

    return '';
};

const renderProcessors = function() {
    return (
        <div className="row">
            <div className="col-xs-12">
                {processorsSelector.call(this)}
                <div className="well row no-bottom-padding">
                    <div className="col-xs-12">
                    {this.state.components.length > 0 ?
                        this.state.components.map(c =>
                            renderComponent.call(
                                this,
                                c,
                                this.handleProcessorComponentDeselect,
                                'Deselect'
                            )
                    ) : (
                        <p>No processors added yet</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default renderProcessors;
