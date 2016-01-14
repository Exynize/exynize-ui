import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import usersStream, {getUsers} from './getUsers';
import updateUserStream, {updateUser} from './updateUser';

// create subject
const adminSubject = new ReplaySubject(1);

// plug in actions
usersStream.subscribe(adminSubject);
updateUserStream.subscribe(adminSubject);

// create resulting store stream
const admin = adminSubject
    .scan((state, newData) => state.merge(newData), defaultState);

// dispatch default state
adminSubject.onNext(defaultState);

export {getUsers, updateUser};
export default admin;
