import React from 'react';
import {History} from 'react-router';
import auth, {login, resetPassword} from '../../stores/auth';

const Login = React.createClass({
    mixins: [History],

    componentDidMount() {
        this.sub = auth
            .map(s => s.get('authed'))
            .filter(authed => authed === true)
            .subscribe(() => this.history.pushState(null, '/'));
    },
    componentWillUnmount() {
        this.sub.dispose();
    },

    doLogin() {
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        login({email, password});
    },

    doReset() {
        const email = this.refs.email.value;
        resetPassword({email});
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                    <input className="form-control" type="text" placeholder="Email" ref="email" />
                    <input className="form-control" type="password" placeholder="Password" ref="pass" />
                    <button className="btn btn-primary" onClick={this.doLogin}>
                        Login
                    </button>
                    <button className="btn btn-link pull-right" onClick={this.doReset}>
                        Reset password
                    </button>
                </div>
            </div>
        );
    },
});

export default Login;
