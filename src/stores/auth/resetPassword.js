import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {createNotification} from '../notifications';

const resetPassword = createAction();

const stream = resetPassword.$
.flatMap(data =>
    request
    .post(apiBase + '/api/password/reset')
    .send(data)
    .observe()
    .map(res => {
        if (res.statusCode === 204) {
            createNotification({message: 'Success! Check your email for instructions!', type: 'success'});
            return;
        }

        createNotification({message: `Error resetting password, server returned ${res.statusCode}!`, type: 'danger'});
        return;
    })
    .catch(err => {
        createNotification({
            message: `Error resetting password, server returned ${err.response.code}!
            Server response: ${err.response.body.error}`,
            type: 'danger',
        });
        return Observable.return(undefined);
    })
)
.map(() => fromJS({}));

export {resetPassword};
export default stream;
