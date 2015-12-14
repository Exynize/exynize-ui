import generateAuth from './generateAuth';

const {action, stream} = generateAuth('/api/login');

export {action as login};
export default stream;
