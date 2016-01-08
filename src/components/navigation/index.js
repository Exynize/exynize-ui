import React from 'react';
import {Link} from 'react-router';
import auth from '../../stores/auth';
import {RxState} from '../../stores/util';

const authedMenu = [
    <li key="newcomponent">
        <Link activeClassName="active" to="/component/new" state={{}}>Create component</Link>
    </li>,
    <li key="newpipeline">
        <Link activeClassName="active" to="/pipeline/new" state={{}}>Create pipeline</Link>
    </li>,
    <li key="allcomponents">
        <Link activeClassName="active" to="/components">Browse components</Link>
    </li>,
    <li key="allpipelines">
        <Link activeClassName="active" to="/pipelines">Browse pipelines</Link>
    </li>,
];

const notAuthedMenu = [
    <li key="login">
        <Link activeClassName="active" to="/login">Login</Link>
    </li>,
    <li key="register">
        <Link activeClassName="active" to="/register">Register</Link>
    </li>,
];

const Navigation = React.createClass({
    mixins: [RxState],
    stores: {
        authed: auth.map(v => v.get('authed')),
        user: auth.map(v => v.get('user')),
    },

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">Exynize</Link>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        {this.state.authed ? authedMenu : notAuthedMenu}
                    </ul>
                {this.state.authed ? (
                    <ul className="nav navbar-nav navbar-right">
                        {this.state.user && this.state.user.get('isAdmin') ? (
                        <li><Link to="/admin">Admin</Link></li>
                        ) : ''}
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                ) : ''}
                </div>
            </nav>
        );
    },
});

export default Navigation;
