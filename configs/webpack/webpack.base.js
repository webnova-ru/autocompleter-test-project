const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');
const nib = require('nib');

const { env } = process;

const customLoaderOptions = {
    stylus: {
        use: [nib(), autoprefixer({ browsers: ['last 2 versions'] })],
        import: ['~nib/lib/nib/index.styl', path.resolve('./src/lib/stylus/color.styl')]
    }
};

module.exports = (options) => ({
    entry: Object.assign({
        vendor: ['babel-polyfill', 'react', 'react-dom']
    }, options.entry),
    output: Object.assign({
        path: path.resolve(process.cwd(), '_dist'),
        publicPath: '/',
    }, options.output),

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                query: options.babelQuery
            }, {
                test: /\.json$/,
                use: 'json-loader'
            }, {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ use: 'css-loader?modules'})
            }, {
                test: /\.styl$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({ use: ['css-loader?modules', 'stylus-relative-loader']})
            }, {
                test: /\.(jpg|png|gif)$/,
                use: [
                    'file-loader',
                    'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: 'file-loader-loader'
            }
        ]
    },

    plugins: [].concat(options.plugins).filter(Boolean).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(env.NODE_ENV),
            },
            __DEV__: (env === 'development' || typeof env === 'undefined'),
            __PRODUCTION__: (env === 'production'),
            __CURRENT_ENV__: env
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            allChunks: true
        }),
        new webpack.LoaderOptionsPlugin({
            options: customLoaderOptions
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js'
        })
    ]),

    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ],
        extensions: [ '.js', '.json', '.styl' ]
    },

    devServer: {
        contentBase: './_dist',
        stats: {
            colors: true,
            hash: false,
            version: false,
            children: false,
            chunks: false,
            modules: false
        }
    },

    devtool: options.devtool,
    target: 'web',
    stats: options.stats || {
        colors: true,
        hash: false,
        version: false,
        children: false,
        chunks: false,
        modules: false
    }
});
