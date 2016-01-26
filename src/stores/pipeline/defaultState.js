import {fromJS} from 'immutable';

// pipeline state
const pipeState = fromJS({
    testResult: undefined,
    pipelines: [],
    pipelineLog: [],
    pipeline: {},
});

export default pipeState;
