import {fromJS} from 'immutable';
import jwtDecode from 'jwt-decode';

// get and check auth token
const savedToken = localStorage.getItem('auth.token');
// if token is here
let user = undefined;
if (savedToken) {
    user = jwtDecode(savedToken);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    // if token is here and not expired
    if (user.exp <= currentTime) {
        user = undefined;
    }
}

// auth state
const authState = fromJS({
    user,
    token: savedToken,
    authed: user ? true : false,
});


export default authState;
