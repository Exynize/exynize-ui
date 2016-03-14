import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {clearNotifications} from './stores/notifications';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/paper/bootstrap.min.css';
import '../style/main.css';
import '../style/ribbon.css';

// app wrapper
import App from './app';

// routes
import routes from './routes';

// clear notifications on route change
browserHistory.listen(clearNotifications);

// render
render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {routes}
        </Route>
    </Router>
), document.getElementById('container'));
