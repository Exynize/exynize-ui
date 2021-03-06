import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const getComponent = createAction();

const stream = getComponent.$
    .map(signRequest)
    .flatMap(data =>
        request
        .get(apiBase + `/api/component/${data.user}/${data.component}`)
        .query({token: data.token})
        .observe()
        .map(res => res.body)
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return([]);
        })
    )
    .map(data => fromJS({
        component: data,
    }));

export {getComponent};
export default stream;
