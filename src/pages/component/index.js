import React from 'react';
import ComponentEditor from '../../components/componentEditor';
import {RxState} from '../../stores/util';
import componentStore, {getComponent, newComponent} from '../../stores/component';

const Component = React.createClass({
    mixins: [RxState],

    stores: {
        component: componentStore
            .map(s => s.get('component'))
            .filter(c => c.count() > 0) // only work with non-null components
            .distinctUntilChanged() // only update when component changed
            .map(c => c.toJS()),
    },

    getInitialState() {
        // trigger initial component load
        this.updateComponent(this.props);
        // return
        return {component: undefined};
    },

    componentWillReceiveProps(nextProps) {
        this.updateComponent(nextProps);
    },

    updateComponent(props) {
        // clear if new route
        if (props.params.user === 'new') {
            return newComponent();
        }
        // if user and component name present - get component from server
        if (props.params.user && props.params.component) {
            return this.getComponent(this.props.params);
        }
    },

    getComponent({user, component}) {
        getComponent({user, component});
    },

    render() {
        return <ComponentEditor {...this.state.component} />;
    },
});

export default Component;
