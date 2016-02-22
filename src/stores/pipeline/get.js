import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const getPipeline = createAction();

const stream = getPipeline.$
    .map(signRequest)
    .flatMap(data =>
        request
        .get(apiBase + `/api/pipes/${data.user}/${data.pipeline}`)
        .query({token: data.token})
        .observe()
        .map(res => res.body)
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({error: e.message});
        })
    )
    .map(data => fromJS({
        pipeline: data,
    }));

export {getPipeline};
export default stream;
