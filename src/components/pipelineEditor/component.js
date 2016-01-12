import React from 'react';
import {Link} from 'react-router';

const renderComponent = function(c: Object, handleComponent: Function, selectLabel: string = 'Select') {
    return (
        <div className="row row-margin-bottom" key={'component_' + c.id}>
            <Link to={`/user/${c.user.username}`}
                className={'user ' + (c.user.id === this.state.user.id ? 'user-self' : '')}>
                @{c.user.username}
            </Link>
            &nbsp;/&nbsp;
            <Link to={`/component/${c.user.username}/${c.refName}`}
                className="component">
                {c.name}
            </Link>
            <div className="text-muted">
                <span className="label label-info label-margined">{c.type}</span>
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
            </div>
            {c.params && c.params.length ? (c.params.map((paramName, i) => (
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
            ))) : ''}
            <p>{c.description}</p>
            {c.showSource ? (
            <pre style={{marginTop: 10}}>{c.source}</pre>
            ) : ''}
        </div>
    );
};

export default renderComponent;
