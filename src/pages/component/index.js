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
        // return
        return this.updateComponent(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.setState(this.updateComponent(nextProps));
    },

    updateComponent(props) {
        let component = props.location.state ? props.location.state.component : undefined;
        // clear if new route
        if (this.props.params.user === 'new') {
            component = undefined;
            newComponent();
        }
        // if user and component name present - get component from server
        if (this.props.params.user && this.props.params.component) {
            component = undefined;
            this.getComponent(this.props.params);
        }
        return {component};
    },

    getComponent({user, component}) {
        getComponent({user, component});
    },

    render() {
        return <ComponentEditor {...this.state.component} />;
    },
});

export default Component;
