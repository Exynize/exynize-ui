// start webpack
const webpack = require('webpack');
const config = require('./webpack.config.js');
// remove debug stuff
delete config.devtool;
delete config.debug;
// define node_env
config.plugins = [
    new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}
    }),
];
// returns a Compiler instance
const compiler = webpack(config);

compiler.run(function(err, stat) {
    if (err) {
        console.error('error:', err);
        process.exit(1);
    }

    if (stat.compilation.errors && stat.compilation.errors.length > 0) {
        console.error('error:', stat.compilation.errors);
        process.exit(1);
    }

    console.log('done!');
});
