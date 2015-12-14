import {Observable} from 'rx';
import {socketBase} from '../config';

export const observableSocket = (url: string, data: any) =>
    Observable.create((observer) => {
        const ws = new WebSocket(socketBase + url);
        // handle connect
        ws.onopen = () => {
            ws.send(JSON.stringify(data));
            observer.onNext({ws, resp: '[socket]: init'});
        };
        // handle close
        ws.onclose = () => {
            observer.onNext({end: true, resp: '[socket]: close'});
            observer.onCompleted();
        };
        // handle message
        ws.onmessage = (event) => {
            const resp = JSON.parse(event.data);
            observer.onNext({ws, resp});
        };
    })
    .scan((acc, res) => {
        // if error, only append error
        if (res.resp.error) {
            acc.error = res.resp.error;
        } else {
            acc.resp = [res.resp, ...acc.resp];
        }

        // if end, remove ws from accumulator
        if (res.end) {
            acc.ws = undefined;
            return acc;
        }

        // if ws is not yet added - add it
        if (!acc.ws) {
            acc.ws = res.ws;
        }

        // return accumulator
        return acc;
    }, {resp: []});
