import {currentState} from '../../stores/auth';

export const requireAuth = (nextState, replace) => {
    if (!currentState.get('authed')) {
        replace('/login');
    }
};

export const requireAdminAuth = (nextState, replace) => {
    if (!currentState.get('authed') || !currentState.getIn(['user', 'isAdmin'])) {
        replace('/');
    }
};
