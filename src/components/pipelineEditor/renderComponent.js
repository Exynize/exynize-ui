import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const rendererComponentSelector = function() {
    const comps = this.state.allComponents.filter(c => c.type === 'render');
    return renderComponentSelector.call(this, comps, this.handleRendererComponent);
};

const renderSelector = function() {
    if (this.state.rendererComponentSelect) {
        return rendererComponentSelector.call(this);
    }

    return '';
};

const renderRendererComponent = function() {
    return (
        <div className="row">
            <div className="col-xs-12">
                {renderSelector.call(this)}
                <div className="well row no-bottom-padding">
                    <div className="col-xs-12">
                    {this.state.render ?
                    renderComponent.call(
                        this,
                        this.state.render,
                        this.handleRendererComponent.bind(this, undefined),
                        'Deselect'
                    ) : (
                        <p>No render selected</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default renderRendererComponent;
