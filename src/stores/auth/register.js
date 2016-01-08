import {fromJS} from 'immutable';
import {Observable} from 'rx';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {createNotification} from '../notifications';

const register = createAction();

const stream = register.$
.flatMap(data =>
    request
    .post(apiBase + '/api/register')
    .send(data)
    .observe()
    .map(res => {
        if (res.statusCode === 201) {
            createNotification({message: 'Success! Check your email - you still need to confirm it!', type: 'success'});
            return;
        }

        createNotification({message: `Error registering, server returned ${res.statusCode}!`, type: 'danger'});
        return;
    })
    .catch(err => {
        createNotification({
            message: `Error registering, server returned ${err.response.statusCode}!
            Server response: ${err.response.body.message}`,
            type: 'danger',
        });
        return Observable.return(undefined);
    })
)
.map(() => fromJS({}));

export {register};
export default stream;
