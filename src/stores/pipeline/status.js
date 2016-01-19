import {createAction, observableSocket} from '../util';
import {fromJS} from 'immutable';
import {signRequest} from '../auth';

const pipelineStatus = createAction();

const stream = pipelineStatus.$
    .map(signRequest)
    .flatMap(data => observableSocket(`/api/pipes/${data.id}/status`, data))
    .map(data => data.resp.filter(it => typeof it === 'object'))
    .map(data => data[0])
    .filter(data => data !== undefined)
    .map(data => fromJS({
        pipelines: [data],
    }));

export {pipelineStatus};
export default stream;
