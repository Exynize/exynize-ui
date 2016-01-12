import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const rendererComponentSelector = function() {
    const comps = this.state.allComponents.filter(c => c.type === 'render');
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
    if (this.state.render) {
        return (
            <div className="well row">
                <div className="col-xs-12">
                {renderComponent.call(
                    this,
                    this.state.render,
                    this.handleRendererComponent.bind(this, undefined),
                    'Deselect'
                )}
                </div>
            </div>
        );
    }

    return noSource.call(this);
};

export default renderRendererComponent;
