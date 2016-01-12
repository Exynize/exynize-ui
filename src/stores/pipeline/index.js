import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import testStream, {testPipeline} from './test';
import createStream, {createPipeline} from './create';
import getAllStream, {getPipelines} from './getAll';
import startStream, {startPipeline} from './start';
import stopStream, {stopPipeline} from './stop';
import logStream, {getPipelineLog} from './getLog';
import getStream, {getPipeline} from './get';

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

// create result store stream
const pipelines = pipelinesSubject
    .startWith(defaultState)
    .scan((state, newData) => state.merge(newData), defaultState);

export {testPipeline, createPipeline, getPipelines, startPipeline, stopPipeline, getPipelineLog, getPipeline};
export default pipelines;
