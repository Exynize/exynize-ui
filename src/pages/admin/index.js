import React from 'react';
import md5 from 'blueimp-md5';
import {Checkbox} from '../../components/bootstrap';
import {RxState} from '../../stores/util';
import auth, {resetPassword} from '../../stores/auth';
import admin, {getUsers, updateUser} from '../../stores/admin';

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

    render() {
        return (
            <div className="row">
                <div className="col-xs-8 col-xs-offset-2">
                    <div className="page-header page-header-slim">
                        <h4>Users</h4>
                    </div>
                    <div className="row">
                    {this.state.users.map(user => (
                        <div className="col-xs-4 user-item" key={user.get('id')}>
                            <div className="list-group-item">
                                <div className="row-picture">
                                    <img
                                        className="circle"
                                        src={`http://www.gravatar.com/avatar/${md5(user.get('email'))}`} />
                                </div>
                                <div className="row-content">
                                    <h5 className="list-group-item-heading">
                                        {user.get('username')} &lt;{user.get('email')}&gt;
                                    </h5>
                                    <div className="list-group-item-text">
                                        <Checkbox
                                            label="Email validated"
                                            checked={user.get('isEmailValid')}
                                            onChange={this.handleChange.bind(this, 'isEmailValid', user)} />
                                        <Checkbox
                                            label="Admin"
                                            checked={user.get('isAdmin')}
                                            onChange={this.handleChange.bind(this, 'isAdmin', user)} />
                                        <button
                                            className="btn btn-warning"
                                            onClick={this.handlePasswordReset.bind(this, user)}>
                                            Reset password
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
