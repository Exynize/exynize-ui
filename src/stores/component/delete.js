import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const deleteComponent = createAction();

const stream = deleteComponent.$
    .map(signRequest)
    .flatMap(data =>
        request
        .del(apiBase + `/api/component/${data.user}/${data.component}`)
        .send({token: data.token})
        .observe()
        .map(res => {
            if (res.statusCode === 204) {
                createNotification({message: 'Success! Component was deleted!', type: 'success'});
                return true;
            }

            createNotification({
                message: `Error deleting component, server returned ${res.statusCode}!`,
                type: 'danger',
            });
            return false;
        })
        .catch(err => {
            createNotification({
                message: `Error deleting component, server returned ${err.response.code}!
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

export {deleteComponent};
export default stream;
