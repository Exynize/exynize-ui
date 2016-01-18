import React from 'react';
import ComponentSelector from '../../components/componentSelector';

const renderComponentSelector = function(components: Array<Object>, handleComponent: Function) {
    return (
        <ComponentSelector
            components={components}
            user={this.state.user}
            pageSize={3}
            actionButtons={c => (
                <button
                    className="btn btn-primary btn-xs btn-margin-left pull-right"
                    onClick={handleComponent.bind(null, c)}>
                    Select
                </button>
            )} />
    );
};

export default renderComponentSelector;
