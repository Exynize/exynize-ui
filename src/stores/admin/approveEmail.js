import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const approveEmail = createAction();

const stream = approveEmail.$
    .map(user => user.toJS())
    .map(signRequest)
    .flatMap(data =>
        request
        .post(apiBase + '/api/admin/approveEmail')
        .send(data)
        .observe()
        .map(res => {
            if (res.statusCode === 204) {
                createNotification({message: 'Success! Account approved!', type: 'success'});
                return {};
            }

            createNotification({
                message: `Error approving, server returned ${res.statusCode}!`,
                type: 'danger',
            });
            return {};
        })
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({});
        })
    )
    .map(data => fromJS(data));

export {approveEmail};
export default stream;
