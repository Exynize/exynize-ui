import React from 'react';
import {History} from 'react-router';
import auth, {register} from '../../stores/auth';

const Register = React.createClass({
    mixins: [History],

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
        register({email, password});
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <input className="form-control" type="text" placeholder="Email" ref="email" />
                    <input className="form-control" type="password" placeholder="Password" ref="pass" />
                    <button className="btn btn-primary" onClick={this.register}>
                        Register
                    </button>
                </div>
            </div>
        );
    },
});

export default Register;
