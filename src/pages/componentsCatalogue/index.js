import React from 'react';
import {History} from 'react-router';
import {Row} from '../../components/bootstrap';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';
import authStore from '../../stores/auth';

const ComponentsCatalogue = React.createClass({
    mixins: [History, RxState],
    stores: {
        components: componentStore.map(s => s.get('components')),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getInitialState() {
        getComponents();
        return {components: [], user: {}};
    },

    handleComponentEdit(component) {
        this.history.pushState({component}, '/newcomponent');
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header">
                        <h3>Components catalogue</h3>
                    </div>
                    {this.state.components.map(c => c.toJS()).map(c => (
                        <div className="row row-margin-bottom" key={'component_' + c.id}>
                            {c.user.id === this.state.user.id ? (
                            <button
                                className="btn btn-warning btn-xs pull-right"
                                onClick={this.handleComponentEdit.bind(this, c)}>
                                Edit
                            </button>
                            ) : ''}
                            <a href={`/user/${c.user.username}`}
                                className={'user ' + (c.user.id === this.state.user.id ? 'user-self' : '')}>
                                @{c.user.username}
                            </a>
                            &nbsp;/&nbsp;
                            <a href={`/component/${c.user.username}/${c.refName}`}
                                className="component">
                                {c.name}
                            </a>
                            <div className="text-muted">
                                <span className="label label-info label-margined">{c.type}</span>
                                <span className="label label-default label-margined">
                                    {c.isPublic ? 'public' : 'private'}
                                </span>
                                <span className="label label-default label-margined">
                                    {c.isSourcePublic ? 'public' : 'private'} source
                                </span>
                            </div>
                            <p>{c.description}</p>
                            {c.source ? (
                            <pre style={{marginTop: 10}}>{c.source}</pre>
                            ) : ''}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
});

export default ComponentsCatalogue;
