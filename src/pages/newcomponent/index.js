import React from 'react';
import ComponentEditor from '../../components/componentEditor';

const NewComponent = React.createClass({
    render() {
        return <ComponentEditor component={this.props.location.state.component} />;
    },
});

export default NewComponent;
