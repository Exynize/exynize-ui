export const apiUri = process.env.NODE_ENV === 'production' ? window.location.host : 'localhost:8080';
export const socketBase = 'ws://' + apiUri;
export const apiBase = window.location.protocol + '//' + apiUri;
