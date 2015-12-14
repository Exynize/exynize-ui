import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const createComponent = createAction();

const stream = createComponent.$
    .map(signRequest)
    .flatMap(data =>
        request
        .post(apiBase + '/api/components')
        .send(data)
        .observe()
        // TODO: refactor to use new notification system
        .map(res => {
            if (res.statusCode === 201) {
                createNotification({message: 'Success! Component was created!', type: 'success'});
                return true;
            }

            createNotification({
                message: `Error creating component, server returned ${res.statusCode}!`,
                type: 'danger',
            });
            return false;
        })
        .catch(err => {
            createNotification({
                message: `Error creating component, server returned ${err.response.code}!
                Server response: ${err.response.body.error}`,
                type: 'danger',
            });
            return Observable.return(false);
        })
    )
    .map(createResult => fromJS({
        createResult,
        // reset test result
        testResult: {},
    }));

export {createComponent};
export default stream;
