// is there better way?
export const signRequest = (data: Object) => {
    const token = localStorage.getItem('auth.token');
    // console.log('sign', data, 'with', token);
    data.token = token;
    return data;
};
