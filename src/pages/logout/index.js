import React from 'react';
import {browserHistory} from 'react-router';
import {logout} from '../../stores/auth';

const Logout = React.createClass({
    componentDidMount() {
        logout();
        // navigate to logout
        browserHistory.push('/login');
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
