import React from 'react';
import {browserHistory} from 'react-router';
import auth, {register} from '../../stores/auth';

const Register = React.createClass({
    getInitialState() {
        return {
            error: undefined,
        };
    },

    componentDidMount() {
        this.sub = auth.subscribe(s => {
            if (s.get('authed')) {
                browserHistory.push('/');
            }
        });
    },
    componentWillUnmount() {
        this.sub.dispose();
    },

    register() {
        const email = this.refs.email.value;
        const username = this.refs.username.value;
        const password = this.refs.pass.value;
        const passRepeat = this.refs.passRepeat.value;
        if (password !== passRepeat) {
            this.setState({error: 'Passwords must match!'});
            return;
        }
        register({email, username, password});
    },

    resetError() {
        if (this.state.error) {
            this.setState({error: undefined});
        }
    },

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.register();
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
                                        className="form-control"
                                        type="text"
                                        autoFocus
                                        ref="email"
                                        id="email"
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-lg-2" htmlFor="username">
                                    Username
                                </label>
                                <div className="col-lg-10">
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="username"
                                        ref="username"
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
                                        onChange={this.resetError}
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-lg-2" htmlFor="passRepeat">
                                    Password again
                                </label>
                                <div className="col-lg-10">
                                    <input
                                        className="form-control"
                                        type="password"
                                        ref="passRepeat"
                                        id="passRepeat"
                                        onChange={this.resetError}
                                        onKeyPress={this.handleKeyPress} />
                                </div>
                            </div>
                            {this.state.error ? (
                                <div className="alert alert-danger">{this.state.error}</div>
                            ) : (
                                <button className="btn btn-primary pull-right" onClick={this.register}>
                                    Register
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

export default Register;
