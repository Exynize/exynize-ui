import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import createStream, {createNotification} from './create';
import deleteStream, {deleteNotification} from './delete';
import clearStream, {clearNotifications} from './clear';

// create bus
const notificationsSubject = new ReplaySubject(1);

// plug in actions
createStream.subscribe(notificationsSubject);
deleteStream.subscribe(notificationsSubject);
clearStream.subscribe(notificationsSubject);

// create result store stream
const notifications = notificationsSubject
    .scan((state, data) => {
        const notification = data.get('notification');
        const action = data.get('action');

        if (action === 'clear') {
            return defaultState;
        }

        if (!notification) {
            return state;
        }

        if (action === 'delete') {
            return state.delete(state.indexOf(notification));
        }

        return state.push(notification);
    }, defaultState);

// dispatch default state
notificationsSubject.onNext(defaultState);

export {createNotification, deleteNotification, clearNotifications};
export default notifications;
