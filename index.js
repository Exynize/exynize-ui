// start webpack
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
// define node_env
config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
];
// returns a Compiler instance
const compiler = webpack(config);

// create express
const app = express();
app.use(express.static(__dirname));

app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
}));

app.use(webpackHotMiddleware(compiler));

// serve index
app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// start server
app.listen(3000, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> Listening on port 3000');
});
