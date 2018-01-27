const path = require('path');
const webpack =require('webpack');

module.exports = require('./webpack.base')({
    entry: {
        app: path.join(process.cwd(), 'src/main.js')
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    devtool: 'cheap-module-source-map'
});
