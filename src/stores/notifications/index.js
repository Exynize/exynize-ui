import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import createStream, {createNotification} from './create';
import deleteStream, {deleteNotification} from './delete';

// create bus
const notificationsSubject = new ReplaySubject(1);

// plug in actions
createStream.subscribe(notificationsSubject);
deleteStream.subscribe(notificationsSubject);

// create result store stream
const notifications = notificationsSubject
    .startWith(defaultState)
    .scan((state, data) => {
        const notification = data.get('notification');
        const action = data.get('action');

        if (!notification) {
            return state;
        }

        if (action === 'delete') {
            return state.delete(state.indexOf(notification));
        }

        return state.push(notification);
    }, defaultState);

export {createNotification, deleteNotification};
export default notifications;
