import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const sourceComponentSelector = function() {
    const comps = this.state.components.filter(c => c.type === 'source');
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
    if (this.state.sourceComponent) {
        return (
            <div className="well">
            {renderComponent.call(
                this,
                this.state.sourceComponent,
                this.handleSourceComponent.bind(this, undefined),
                'Deselect'
            )}
            </div>
        );
    }

    return noSource.call(this);
};

export default renderSource;
