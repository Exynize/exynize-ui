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

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.doLogin();
        }
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-4 col-xs-offset-4">
                    <div className="panel panel-default">
                        <div className="panel-body form-horizontal">
                            <div className="form-group">
                                <label className="control-label col-lg-2" htmlFor="email">
                                    Email
                                </label>
                                <div className="col-lg-10">
                                    <input
                                        autoFocus
                                        className="form-control"
                                        type="text"
                                        id="email"
                                        ref="email"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-lg-2" htmlFor="pass">
                                    Password
                                </label>
                                <div className="col-lg-10">
                                    <input
                                        className="form-control"
                                        type="password"
                                        ref="pass"
                                        id="pass"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            <button className="btn btn-link row-margin-top" onClick={this.doReset}>
                                Reset password
                            </button>
                            <button className="btn btn-primary pull-right row-margin-top" onClick={this.doLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

export default Login;
