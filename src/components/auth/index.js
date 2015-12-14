import {currentState} from '../../stores/auth';

export const requireAuth = (nextState, replaceState) => {
    if (!currentState.get('authed')) {
        replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
};

export const requireAdminAuth = (nextState, replaceState) => {
    if (!currentState.get('authed') || !currentState.getIn(['user', 'isAdmin'])) {
        replaceState({nextPathname: nextState.location.pathname}, '/');
    }
};
