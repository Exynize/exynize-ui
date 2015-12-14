import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import testStream, {testPipeline} from './test';
import createStream, {createPipeline} from './create';
import getStream, {getPipelines} from './get';
import startStream, {startPipeline} from './start';
import stopStream, {stopPipeline} from './stop';
import logStream, {getPipelineLog} from './getLog';

// create bus
const pipelinesSubject = new ReplaySubject(1);

// plug in actions
testStream.subscribe(pipelinesSubject);
createStream.subscribe(pipelinesSubject);
getStream.subscribe(pipelinesSubject);
startStream.subscribe(pipelinesSubject);
logStream.subscribe(pipelinesSubject);
stopStream.subscribe(pipelinesSubject);

// create result store stream
const pipelines = pipelinesSubject
    .startWith(defaultState)
    .scan((state, newData) => state.merge(newData), defaultState);

export {testPipeline, createPipeline, getPipelines, startPipeline, stopPipeline, getPipelineLog};
export default pipelines;
