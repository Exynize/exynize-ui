import {fromJS} from 'immutable';
import {createAction} from '../util';

const createNotification = createAction();

const stream = createNotification.$
    .map(notification => fromJS({notification}));

export {createNotification};
export default stream;
