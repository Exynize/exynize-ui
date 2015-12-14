import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const stopPipeline = createAction();

const stream = stopPipeline.$
    .map(signRequest)
    .flatMap(data =>
        request
        .post(apiBase + '/api/pipes/' + data.id + '/stop')
        .query({token: data.token})
        .observe()
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({});
        })
    )
    .map(data => fromJS(data));

export {stopPipeline};
export default stream;
