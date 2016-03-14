import {fromJS} from 'immutable';
import {createAction} from '../util';

const clearNotifications = createAction();

const stream = clearNotifications.$
    .map(() => fromJS({action: 'clear'}));

export {clearNotifications};
export default stream;
