import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const rendererComponentSelector = function() {
    const comps = this.state.components.filter(c => c.type === 'render');
    return renderComponentSelector.call(this, comps, this.handleRendererComponent);
};

const noSource = function() {
    if (this.state.rendererComponentSelect) {
        return rendererComponentSelector.call(this);
    }

    return (
        <button className="btn btn-default" onClick={this.handleSelectRendererComponent}>
            Select renderer component
        </button>
    );
};

const renderRendererComponent = function() {
    if (this.state.rendererComponent) {
        return (
            <div className="well">
            {renderComponent.call(
                this,
                this.state.rendererComponent,
                this.handleRendererComponent.bind(this, undefined),
                'Deselect'
            )}
            </div>
        );
    }

    return noSource.call(this);
};

export default renderRendererComponent;
