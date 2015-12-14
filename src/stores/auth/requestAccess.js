import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {createNotification} from '../notifications';

const requestAccess = createAction();

const stream = requestAccess.$
.flatMap(data =>
    request
    .post(apiBase + '/api/requestAccess')
    .send(data)
    .observe()
    .map(res => {
        if (res.statusCode === 201) {
            createNotification({message: 'Success! Check your email - you still need to confirm it!', type: 'success'});
            return;
        }

        createNotification({message: `Error resetting password, server returned ${res.statusCode}!`, type: 'danger'});
        return;
    })
    .catch(err => {
        createNotification({
            message: `Error requesting access, server returned ${err.response.code}!
            Server response: ${err.response.body.error}`,
            type: 'danger',
        });
        return Observable.return(undefined);
    })
)
.map(() => fromJS({}));

export {requestAccess};
export default stream;
