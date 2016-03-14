import React from 'react';
import Notifications from '../components/notifications';
import Navigation from '../components/navigation';
import Report from '../components/report';

export default ({children}) => (
    <div className="container-fluid">
        <Report />
        <Navigation />
        <Notifications />
        {children}
    </div>
);
