import {ReplaySubject} from 'rx';
import defaultState from './defaultState';

// actions
import testStream, {testComponent} from './test';
import createStream, {createComponent} from './create';
import getComponentStream, {getComponent} from './get';
import getComponentsStream, {getComponents} from './getAll';
import newComponentStream, {newComponent} from './new';

// create bus
const componentsSubject = new ReplaySubject(1);

// plug in actions
testStream.subscribe(componentsSubject);
createStream.subscribe(componentsSubject);
getComponentStream.subscribe(componentsSubject);
getComponentsStream.subscribe(componentsSubject);
newComponentStream.subscribe(componentsSubject);

// create result store stream
const components = componentsSubject
    .startWith(defaultState)
    .scan((state, newData) => state.merge(newData), defaultState);

export {testComponent, createComponent, getComponents, getComponent, newComponent};
export default components;
