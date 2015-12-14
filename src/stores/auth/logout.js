import {fromJS} from 'immutable';
import {createAction} from '../util';

const logout = createAction();

export {logout};
export default logout.$
    .map(() => {
        // remove locally
        localStorage.removeItem('auth.token');
        // return state slice
        return fromJS({
            user: undefined,
            token: undefined,
            authed: false,
        });
    });
