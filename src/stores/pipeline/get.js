import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const getPipelines = createAction();

const stream = getPipelines.$
    .map(() => ({}))
    .map(signRequest)
    .flatMap(data =>
        request
        .get(apiBase + '/api/pipes')
        .query(data)
        .observe()
        .map(res => res.body)
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return([]);
        })
    )
    .map(data => fromJS({
        pipelines: data,
    }));

export {getPipelines};
export default stream;
