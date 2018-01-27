const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.base')({
    entry: {
        app: path.join(process.cwd(), 'src/main.js')
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    devtool: 'inline-source-map' //'cheap-module-eval-source-map'
});
