import React from 'react';
import {History} from 'react-router';
import auth, {register} from '../../stores/auth';

const Register = React.createClass({
    mixins: [History],

    getInitialState() {
        return {
            error: undefined,
        };
    },

    componentDidMount() {
        this.sub = auth.subscribe(s => {
            if (s.get('authed')) {
                this.history.pushState(null, '/');
            }
        });
    },
    componentWillUnmount() {
        this.sub.dispose();
    },

    register() {
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        const passRepeat = this.refs.passRepeat.value;
        if (password !== passRepeat) {
            this.setState({error: 'Passwords must match!'});
            return;
        }
        register({email, password});
    },

    resetError() {
        if (this.state.error) {
            this.setState({error: undefined});
        }
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    {this.state.error ? (
                        <div className="alert alert-danger">{this.state.error}</div>
                    ) : ''}
                    <input className="form-control" type="text" placeholder="Email" ref="email" />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        ref="pass"
                        onChange={this.resetError} />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Repeat password"
                        ref="passRepeat"
                        onChange={this.resetError} />
                    <button className="btn btn-primary" onClick={this.register}>
                        Register
                    </button>
                </div>
            </div>
        );
    },
});

export default Register;
