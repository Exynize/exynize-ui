import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const sourceComponentSelector = function() {
    const comps = this.state.allComponents.filter(c => c.type === 'source');
    return renderComponentSelector.call(this, comps, this.handleSourceComponent);
};

const noSource = function() {
    if (this.state.sourceComponentSelect) {
        return sourceComponentSelector.call(this);
    }

    return (
        <button className="btn btn-default" onClick={this.handleSelectSourceComponent}>
            Select source component
        </button>
    );
};

const renderSource = function() {
    if (this.state.source) {
        return (
            <div className="well row">
                <div className="col-xs-12">
                {renderComponent.call(
                    this,
                    this.state.source,
                    this.handleSourceComponent.bind(this, undefined),
                    'Deselect'
                )}
                </div>
            </div>
        );
    }

    return noSource.call(this);
};

export default renderSource;
