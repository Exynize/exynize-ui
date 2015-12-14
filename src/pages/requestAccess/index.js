import React from 'react';
import {History} from 'react-router';
import {requestAccess} from '../../stores/auth';

const RequestAccess = React.createClass({
    mixins: [History],

    requestAccess() {
        const name = this.refs.username.value;
        const email = this.refs.email.value;
        const requestDescription = this.refs.description.value;
        requestAccess({name, email, requestDescription});
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <input className="form-control" type="text" placeholder="Your name" ref="username" />
                    <input className="form-control" type="email" placeholder="Your email" ref="email" />
                    <textarea
                        className="form-control"
                        placeholder="Tell us a bit about why you want access"
                        ref="description" />
                    <button className="btn btn-primary" onClick={this.requestAccess}>
                        Request Access
                    </button>
                </div>
            </div>
        );
    },
});

export default RequestAccess;
