import React from 'react';
import notifications, {deleteNotification} from '../../stores/notifications';
import {RxState} from '../../stores/util';

const Navigation = React.createClass({
    mixins: [RxState],
    stores: {
        notifications,
    },

    render() {
        return (
            <div className="row">
                {this.state.notifications.map((notification, index) => (
                    <div
                        key={'notification_' + index}
                        className={'alert alert-' + notification.get('type')}>
                        {notification.get('message')}
                        <button className="close" onClick={deleteNotification.bind(null, notification)}>
                            <span>&times;</span>
                        </button>
                    </div>
                ))}
            </div>
        );
    },
});

export default Navigation;
