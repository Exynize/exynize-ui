import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const getPipelineLog = createAction();

const stream = getPipelineLog.$
    .map(signRequest)
    .flatMap(data =>
        request
        .get(apiBase + '/api/pipes/' + data.id + '/log')
        .query({token: data.token})
        .observe()
        .map(res => res.body)
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return([]);
        })
    )
    .map(data => fromJS({
        pipelineLog: data,
    }));

export {getPipelineLog};
export default stream;
