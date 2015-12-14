import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import loginStream, {login} from './login';
import registerStream, {register} from './register';
import requestAccessStream, {requestAccess} from './requestAccess';
import resetPasswordStream, {resetPassword} from './resetPassword';
import logoutStream, {logout} from './logout';

// utils
import {signRequest} from './signRequest';

// create subject
const authSubject = new ReplaySubject(1);

// plug in all actions
loginStream.subscribe(authSubject);
registerStream.subscribe(authSubject);
requestAccessStream.subscribe(authSubject);
resetPasswordStream.subscribe(authSubject);
logoutStream.subscribe(authSubject);

// create result store stream
const auth = authSubject
    .startWith(defaultState)
    .scan((state, newData) => state.merge(newData), defaultState);

export let currentState = defaultState.toJS();
auth.subscribe(state => currentState = state);

// export actions
export {login, register, logout, requestAccess, resetPassword};
// export utils
export {signRequest};
// export state and state stream
export default auth;
