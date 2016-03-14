import React from 'react';
import {browserHistory} from 'react-router';
import auth, {login, resetPassword} from '../../stores/auth';

const Login = React.createClass({
    componentDidMount() {
        this.sub = auth
            .map(s => s.get('authed'))
            .filter(authed => authed === true)
            .subscribe(() => browserHistory.push('/'));
        // get login and pass from location (for demo purposes)
        // TODO: remove me after demo and figure out a better way
        const {query} = this.props.location;
        const {email, pass} = query;
        this.refs.email.value = email || '';
        this.refs.pass.value = pass || '';
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
                    <h4>What is Exynize?</h4>
                    <p className="description-text">
                        Exynize is an AWS Lambda on steroids mixed with IFTTT.<br/>
                        Log in to give it a shot out!<br/>
                        Or head to <a href="https://github.com/Exynize/exynize-platform/wiki">our wiki</a> to
                        find out more.
                    </p>

                    <h4>Login</h4>
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
