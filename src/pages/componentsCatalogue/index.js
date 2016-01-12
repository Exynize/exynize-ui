import React from 'react';
import {Link} from 'react-router';
import Component from '../../components/component';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';
import authStore from '../../stores/auth';

const ComponentsCatalogue = React.createClass({
    mixins: [RxState],
    stores: {
        components: componentStore.map(s => s.get('components')),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getInitialState() {
        getComponents();
        return {components: [], user: {}};
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header">
                        <h3>Components catalogue</h3>
                    </div>
                    {this.state.components.map(c => c.toJS()).map(c => (
                        <Component key={c.id} {...c} authUser={this.state.user} />
                    ))}
                </div>
            </div>
        );
    },
});

export default ComponentsCatalogue;
