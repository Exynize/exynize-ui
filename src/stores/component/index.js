import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import testStream, {testComponent} from './test';
import createStream, {createComponent} from './create';
import getComponentsStream, {getComponents} from './get';

// create bus
const componentsSubject = new ReplaySubject(1);

// plug in actions
testStream.subscribe(componentsSubject);
createStream.subscribe(componentsSubject);
getComponentsStream.subscribe(componentsSubject);

// create result store stream
const components = componentsSubject
    .startWith(defaultState)
    .scan((state, newData) => state.merge(newData), defaultState);

export {testComponent, createComponent, getComponents};
export default components;
