import {fromJS} from 'immutable';

// pipeline state
const pipeState = fromJS({
    testResult: undefined,
    pipelines: [],
    pipelineLog: undefined,
    pipeline: {},
});

export default pipeState;
