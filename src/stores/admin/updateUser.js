import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';
import {getUsers} from './getUsers';

const updateUser = createAction();

const stream = updateUser.$
    .map(user => user.toJS())
    .map(signRequest)
    .flatMap(data =>
        request
        .post(apiBase + '/api/admin/users')
        .send(data)
        .observe()
        .map(() => ({}))
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({});
        })
    )
    // TODO: find better way?
    .do(() => getUsers())
    .map(data => fromJS(data));

export {updateUser};
export default stream;
