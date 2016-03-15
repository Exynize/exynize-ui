// start webpack
const path = require('path');
const express = require('express');
const proxyMiddleware = require('http-proxy-middleware');

// configure proxy middleware context
const context = '/api'; // requests with this path will be proxied
// configure proxy middleware options
const options = {
    target: process.env.NODE_ENV === 'production' ? 'http://exynize-rest:8080' : 'http://localhost:8080', // target host
    changeOrigin: true,               // needed for virtual hosted sites
    ws: true,                         // proxy websockets
    logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'info',
};
// create the proxy
const proxy = proxyMiddleware(context, options);

// create express
const app = express();
app.use(express.static(__dirname));
app.use(proxy);
// serve index
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// start server
app.listen(3000, function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port 3000');
});
