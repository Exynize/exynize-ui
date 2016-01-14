import React from 'react';
import Component from '../../components/component';
import {RxState} from '../../stores/util';
import componentStore, {getComponents} from '../../stores/component';
import authStore from '../../stores/auth';

const ComponentsCatalogue = React.createClass({
    mixins: [RxState],
    stores: {
        components: componentStore.map(s => s.get('components').toJS()),
        user: authStore.map(s => s.get('user').toJS()),
    },

    getInitialState() {
        getComponents();
        return {components: [], user: {}};
    },

    handleSourceToggle(comp) {
        comp.showSource = !comp.showSource;
        this.forceUpdate();
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header page-header-slim">
                        <h4>Components catalogue</h4>
                    </div>
                    {this.state.components.map(c => (
                        <Component
                            {...c}
                            key={c.id}
                            authUser={this.state.user}
                            toggleSource={this.handleSourceToggle.bind(this, c)} />
                    ))}
                </div>
            </div>
        );
    },
});

export default ComponentsCatalogue;
