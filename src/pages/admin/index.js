import React from 'react';
import md5 from 'blueimp-md5';
import {Checkbox} from '../../components/bootstrap';
import {RxState} from '../../stores/util';
import auth, {resetPassword} from '../../stores/auth';
import admin, {getUsers, updateUser, approveEmail} from '../../stores/admin';

const Admin = React.createClass({
    mixins: [RxState],
    stores: {
        authed: auth.map(v => v.get('authed')),
        users: admin.map(v => v.get('users')),
    },

    getInitialState() {
        return {
            users: [],
        };
    },

    componentWillMount() {
        getUsers();
    },

    handleChange(field, user, e) {
        user = user.set(field, e.target.checked);
        updateUser(user);
    },

    handlePasswordReset(user) {
        resetPassword(user);
    },

    handleApproveEmail(user) {
        approveEmail(user);
    },

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h3>Users:</h3>
                    <div className="row">
                    {this.state.users.map(user => (
                        <div className="col-xs-6 list-group" key={user.get('id')}>
                            <div className="list-group-item">
                                <div className="row-picture">
                                    <img
                                        className="circle"
                                        src={`http://www.gravatar.com/avatar/${md5(user.get('email'))}`} />
                                </div>
                                <div className="row-content">
                                    <h4 className="list-group-item-heading">
                                        {user.get('name')} &lt;{user.get('email')}&gt;
                                    </h4>
                                    <div className="list-group-item-text">
                                        <pre>
                                            {user.get('requestDescription')}
                                        </pre>
                                        <Checkbox
                                            label="Email validated"
                                            checked={user.get('isEmailValid')}
                                            onChange={this.handleChange.bind(this, 'isEmailValid', user)} />
                                        <Checkbox
                                            label="Account approved"
                                            checked={user.get('isApproved')}
                                            onChange={this.handleChange.bind(this, 'isApproved', user)} />
                                        <Checkbox
                                            label="Admin"
                                            checked={user.get('isAdmin')}
                                            onChange={this.handleChange.bind(this, 'isAdmin', user)} />
                                        <button
                                            className="btn btn-warning"
                                            onClick={this.handlePasswordReset.bind(this, user)}>
                                            Reset password
                                        </button>
                                        <button
                                            className="btn btn-success"
                                            onClick={this.handleApproveEmail.bind(this, user)}>
                                            Send approve email
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        );
    },
});

export default Admin;
