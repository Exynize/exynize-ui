import React from 'react';
import renderComponent from './component';
import renderComponentSelector from './componentSelector';

const sourceSelector = function() {
    if (this.state.sourceComponentSelect) {
        const comps = this.state.allComponents.filter(c => c.type === 'source');
        return renderComponentSelector.call(this, comps, this.handleSourceComponent);
    }

    return '';
};

const renderSource = function() {
    return (
        <div className="row">
            <div className="col-xs-12">
                {sourceSelector.call(this)}
                <div className="well row no-bottom-padding">
                    <div className="col-xs-12">
                    {this.state.source ?
                    renderComponent.call(
                        this,
                        this.state.source,
                        this.handleSourceComponent.bind(this, undefined),
                        'Deselect'
                    ) : (
                        <p>No source selected</p>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default renderSource;
