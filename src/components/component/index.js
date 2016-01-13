import React from 'react';
import {Link} from 'react-router';

const Component = (props) => (
    <div className={'panel panel-default ' + (props.short ? 'panel-short' : '')}>
        <div className="panel-heading">
            <h3 className="panel-title">
                <Link to={`/user/${props.user.username}`}
                    className={
                        'user ' +
                        (props.user.id === props.authUser.id ? 'user-self' : '')
                    }>
                    @{props.user.username}
                </Link>
                &nbsp;/&nbsp;
                <Link to={`/component/${props.user.username}/${props.refName}`}
                    className="component">
                    {props.name}
                </Link>
            </h3>
        </div>
        <div className="panel-body no-bottom-padding">
            {props.short ? '' : (
            <div className="text-muted">
                <span className="label label-info label-margined">{props.type}</span>
                <span className="label label-default label-margined">
                    {props.isPublic ? 'public' : 'private'}
                </span>
                <span className="label label-default label-margined">
                    {props.isSourcePublic ? 'public' : 'private'} source
                </span>
            </div>
            )}
            <p className="padded-top-header">{props.description}</p>
            {!props.short && props.source ? (
            <pre style={{marginTop: 10}}>{props.source}</pre>
            ) : ''}
        </div>
    </div>
);


export default Component;
