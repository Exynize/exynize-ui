import React from 'react';
import Component from '../component';

const renderComponent = function(c: Object, handleComponent: Function, selectLabel: string = 'Select') {
    return (
        <Component {...c}
            authUser={this.state.user}
            key={c.id}
            toggleSource={this.handleSourceToggle.bind(this, c)}
            actionButtons={(
                <button
                    className="btn btn-primary btn-xs btn-margin-left pull-right"
                    onClick={handleComponent.bind(this, c)}>
                    {selectLabel}
                </button>
            )}
            additionalInfo={
                c.params && c.params.length ? (c.params.map((paramName, i) => (
                    <div className="input-group input-group-margined" key={'param_' + i}>
                        <span className="input-group-addon">
                            {paramName}
                        </span>
                        <input
                            onChange={this.handleParamChange.bind(this, c, paramName)}
                            className="form-control"
                            type="text"
                            defaultValue={c.args ? c.args[i] : ''}
                            placeholder={paramName} />
                    </div>
                ))) : ''
            } />
    );
};

export default renderComponent;
