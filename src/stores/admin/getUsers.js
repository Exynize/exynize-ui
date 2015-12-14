import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const getUsers = createAction();

const stream = getUsers.$
    .map(() => ({}))
    .map(signRequest)
    .flatMap(data =>
        request
        .get(apiBase + '/api/admin/users')
        .query(data)
        .observe()
        .map(res => ({users: res.body.users}))
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({});
        })
    )
    .map(data => fromJS(data));

export {getUsers};
export default stream;
