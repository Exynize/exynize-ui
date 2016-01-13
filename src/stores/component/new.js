import {fromJS} from 'immutable';
import {createAction} from '../util';

const newComponent = createAction();

const stream = newComponent.$
    .map(() => fromJS({
        component: {
            id: undefined,
            name: 'My new component',
            description: 'My new component description',
            source: `export default (data) => {
    return Rx.Observable.return(\`\${data} => hello world!\`);
};
`,
            version: '1.0.0',
            isPublic: false,
            isSourcePublic: false,
        },
    }));

export {newComponent};
export default stream;
