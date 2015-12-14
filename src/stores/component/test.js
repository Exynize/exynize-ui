import {fromJS} from 'immutable';
import {createAction, observableSocket} from '../util';
import {signRequest} from '../auth';

const testComponent = createAction();

const stream = testComponent.$
    .map(signRequest)
    .flatMap(data => observableSocket('/api/components/exec', data))
    .map(data => fromJS({
        testResult: data,
    }));

export {testComponent};
export default stream;
