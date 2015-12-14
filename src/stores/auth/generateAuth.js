import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import jwtDecode from 'jwt-decode';
import {apiBase} from '../config';
import {createNotification} from '../notifications';

export default (url: string) => {
    const action = createAction();

    const stream = action.$
    .flatMap(data =>
        request
        .post(apiBase + url)
        .send(data)
        .observe()
        .map(res => res.body)
        .catch(err => {
            const message = err.response ? err.response.body.error : err.message;
            const code = err.response ? err.response.statusCode : -1;
            createNotification({
                message: `Server returned ${code}! Error: ${message}`,
                type: 'danger',
            });
            return Observable.return({});
        })
    )
    .map(res => {
        const {token} = res;
        if (token) {
            const user = jwtDecode(token);
            res.user = user;
        }
        return res;
    })
    .map(res => {
        const {user, token} = res;
        // if user and token are valid
        if (user && token) {
            // store locally
            localStorage.setItem('auth.token', token);
            // return state slice
            return fromJS({user, token, authed: true});
        }
    });

    return {action, stream};
};
