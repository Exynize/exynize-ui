import React from 'react';
import {Row} from '../../components/bootstrap';

const renderComponent = function(c: Object, handleComponent: Function, selectLabel: string = 'Select') {
    return (
        <Row size="12" key={'component_' + c.id}>
            <h4>
                {c.name} <small className="label label-default">{c.type}</small>
                <button
                    className="btn btn-default btn-xs btn-margin-left"
                    onClick={this.handleSourceToggle.bind(this, c)}>
                    <span className={'glyphicon glyphicon-' + (c.showSource ? 'minus' : 'plus')} />
                    {c.showSource ? 'Hide' : 'Show'} source
                </button>
                <button
                    className="btn btn-primary btn-xs btn-margin-left"
                    onClick={handleComponent.bind(this, c)}>
                    {selectLabel}
                </button>
                <button
                    className="btn btn-warning btn-xs btn-margin-left pull-right"
                    onClick={this.handleComponentEdit.bind(this, c)}>
                    Edit
                </button>
            </h4>
            {c.params && c.params.length ? (
                c.params.map((paramName, i) => (
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
                ))
            ) : ''}
            <small>{c.description}</small>
            {c.showSource ? (
                <pre style={{marginTop: 10}}>{c.source}</pre>
            ) : ''}
        </Row>
    );
};

export default renderComponent;
