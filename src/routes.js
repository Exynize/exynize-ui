import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {requireAuth, requireAdminAuth} from './components/auth';

// pages
import NotFound from './pages/notfound';
import Home from './pages/home';
import Admin from './pages/admin';
// import Register from './pages/register';
import RequestAccess from './pages/requestAccess';
import Login from './pages/login';
import Logout from './pages/logout';
import ComponentsCatalogue from './pages/componentsCatalogue';
import PipelinesCatalogue from './pages/pipelinesCatalogue';
import NewComponent from './pages/newcomponent';
import NewPipeline from './pages/newpipeline';

export default [
    <IndexRoute key="home" name="home" component={Home} onEnter={requireAuth} />,
    //<Route key="register" path="/register" component={Register}/>,
    <Route key="register" path="/requestAccess" component={RequestAccess}/>,
    <Route key="login" path="/login" component={Login}/>,
    <Route key="logout" path="/logout" component={Logout}/>,
    <Route key="admin" path="/admin" component={Admin} onEnter={requireAdminAuth} />,
    <Route key="allcomponents" path="/allcomponents" component={ComponentsCatalogue} onEnter={requireAuth} />,
    <Route key="allpipelines" path="/allpipelines" component={PipelinesCatalogue} onEnter={requireAuth} />,
    <Route key="newcomponent" path="/newcomponent" component={NewComponent} onEnter={requireAuth} />,
    <Route key="newpipeline" path="/newpipeline" component={NewPipeline} onEnter={requireAuth} />,
    <Route key="notfound" path="*" component={NotFound}/>,
];
