import generateAuth from './generateAuth';

const {action, stream} = generateAuth('/api/register');

export {action as register};
export default stream;
