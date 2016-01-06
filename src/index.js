import React from 'react';
import {render} from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Router, Route} from 'react-router';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/paper/bootstrap.min.css';
import '../style/main.css';

// app wrapper
import App from './app';

// routes
import routes from './routes';

render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            {routes}
        </Route>
    </Router>
), document.getElementById('container'));
