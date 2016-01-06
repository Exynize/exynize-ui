import React from 'react';
import Notifications from '../components/notifications';
import Navigation from '../components/navigation';

export default ({children}) => (
    <div className="container-fluid">
        <Navigation />
        <Notifications />
        {children}
    </div>
);
