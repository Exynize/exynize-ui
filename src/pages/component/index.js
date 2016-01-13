import React from 'react';
import ComponentEditor from '../../components/componentEditor';
import {RxState} from '../../stores/util';
import componentStore, {getComponent} from '../../stores/component';

const Component = React.createClass({
    mixins: [RxState],

    stores: {
        component: componentStore
            .filter(s => s.get('component').count() > 0) // only work with non-null components
            .map(s => s.get('component').toJS()),
    },

    getInitialState() {
        let component = this.props.location.state ? this.props.location.state.component : undefined;
        // clear if new route
        if (this.props.params.user === 'new') {
            component = undefined;
        }
        // if user and component name present - get component from server
        if (this.props.params.user && this.props.params.component) {
            component = undefined;
            this.getComponent(this.props.params);
        }
        // return
        return {
            component,
        };
    },

    getComponent({user, component}) {
        getComponent({user, component});
    },

    render() {
        return <ComponentEditor {...this.state.component} />;
    },
});

export default Component;
