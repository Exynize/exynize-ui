import {fromJS} from 'immutable';
import {createAction} from '../util';

const deleteNotification = createAction();

const stream = deleteNotification.$
    .map(notification => fromJS({action: 'delete', notification}));

window.deleteNotification = deleteNotification;

export {deleteNotification};
export default stream;
