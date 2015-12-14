import {fromJS} from 'immutable';

// pipeline state
const pipeState = fromJS({
    testResult: undefined,
    pipelines: [],
    pipelineLog: undefined,
});

export default pipeState;
