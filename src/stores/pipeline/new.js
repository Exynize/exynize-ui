import {fromJS} from 'immutable';
import {createAction} from '../util';

const newPipeline = createAction();

const stream = newPipeline.$
    .map(() => fromJS({
        pipeline: {
            id: undefined,
            name: 'My new pipeline',
            isPublic: false,
        },
    }));

export {newPipeline};
export default stream;
