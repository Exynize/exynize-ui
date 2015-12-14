import {createAction, observableSocket} from '../util';
import {fromJS} from 'immutable';
import {signRequest} from '../auth';

const testPipeline = createAction();

const stream = testPipeline.$
    .map(signRequest)
    .flatMap(data => observableSocket('/api/pipes/exec', data))
    .map(data => fromJS({
        testResult: data,
    }));

export {testPipeline};
export default stream;
