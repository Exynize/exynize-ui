import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {requireAuth, requireAdminAuth} from './components/auth';

// pages
import NotFound from './pages/notfound';
import Home from './pages/home';
import Admin from './pages/admin';
import Register from './pages/register';
import Login from './pages/login';
import Logout from './pages/logout';
import ComponentsCatalogue from './pages/componentsCatalogue';
import PipelinesCatalogue from './pages/pipelinesCatalogue';
import Component from './pages/component';
import Pipeline from './pages/pipeline';

export default [
    <IndexRoute key="home" name="home" component={Home} onEnter={requireAuth} />,
    <Route key="register" path="/register" component={Register}/>,
    <Route key="login" path="/login" component={Login}/>,
    <Route key="logout" path="/logout" component={Logout}/>,
    <Route key="admin" path="/admin" component={Admin} onEnter={requireAdminAuth} />,
    <Route key="components" path="/components" component={ComponentsCatalogue} onEnter={requireAuth} />,
    <Route key="pipelines" path="/pipelines" component={PipelinesCatalogue} onEnter={requireAuth} />,
    <Route key="component" path="/component/:user(/:component)" component={Component} onEnter={requireAuth} />,
    <Route key="pipeline" path="/pipeline/:user(/:pipeline)" component={Pipeline} onEnter={requireAuth} />,
    <Route key="notfound" path="*" component={NotFound}/>,
];
