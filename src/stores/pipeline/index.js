import {ReplaySubject} from 'rx';
import defaultState from './defaultState';
import mergePipeline from './mergePipelines';

// actions
import testStream, {testPipeline} from './test';
import createStream, {createPipeline} from './create';
import getAllStream, {getPipelines} from './getAll';
import startStream, {startPipeline} from './start';
import stopStream, {stopPipeline} from './stop';
import logStream, {getPipelineLog} from './getLog';
import getStream, {getPipeline} from './get';
import statusStream, {pipelineStatus} from './status';
import deleteStream, {deletePipeline} from './delete';

// create bus
const pipelinesSubject = new ReplaySubject(1);

// plug in actions
testStream.subscribe(pipelinesSubject);
createStream.subscribe(pipelinesSubject);
getAllStream.subscribe(pipelinesSubject);
startStream.subscribe(pipelinesSubject);
logStream.subscribe(pipelinesSubject);
stopStream.subscribe(pipelinesSubject);
getStream.subscribe(pipelinesSubject);
statusStream.subscribe(pipelinesSubject);
deleteStream.subscribe(pipelinesSubject);

// create result store stream
const pipelines = pipelinesSubject
    .scan((state, newData) => state.mergeWith(mergePipeline, newData), defaultState);

// dispatch default state
pipelinesSubject.onNext(defaultState);

export {
    testPipeline,
    createPipeline,
    getPipelines,
    startPipeline,
    stopPipeline,
    getPipelineLog,
    getPipeline,
    pipelineStatus,
    deletePipeline,
};
export default pipelines;
