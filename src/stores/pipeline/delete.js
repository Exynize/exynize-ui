import {Observable} from 'rx';
import {fromJS} from 'immutable';
import {createAction} from '../util';
import request from '../util/request';
import {apiBase} from '../config';
import {signRequest} from '../auth';
import {createNotification} from '../notifications';

const deletePipeline = createAction();

const stream = deletePipeline.$
    .map(signRequest)
    .flatMap(data =>
        request
        .del(apiBase + `/api/pipes/${data.user}/${data.pipeline}`)
        .send({token: data.token})
        .observe()
        .map(res => {
            if (res.statusCode === 204) {
                createNotification({message: 'Success! Pipeline was deleted!', type: 'success'});
                return {};
            }

            createNotification({
                message: `Error deleting pipeline, server returned ${res.statusCode}!`,
                type: 'danger',
            });
            return {};
        })
        .catch(e => {
            createNotification({type: 'danger', message: e.message});
            return Observable.return({});
        })
    )
    .map(data => fromJS(data));

export {deletePipeline};
export default stream;
