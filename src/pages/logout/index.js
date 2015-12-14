import React from 'react';
import {History} from 'react-router';
import {logout} from '../../stores/auth';

const Logout = React.createClass({
    mixins: [History],

    componentDidMount() {
        logout();
        // navigate to logout
        this.history.pushState(null, '/login');
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    Logging out...
                </div>
            </div>
        );
    },
});

export default Logout;
