import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const createPipeline = createAction();

const stream = createPipeline.$
    .map(signRequest)
    .flatMap(data =>
        request
        .post(apiBase + '/api/pipes')
        .send(data)
        .observe()
        .map(res => {
            if (res.statusCode === 201) {
                createNotification({message: 'Success! Pipeline was created!', type: 'success'});
                return {};
            }

            createNotification({
                message: `Error creating pipeline, server returned ${res.statusCode}!`,
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

export {createPipeline};
export default stream;
