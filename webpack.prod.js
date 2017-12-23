const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config/defaults');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

console.log(process.env.NODE_ENV);
module.exports = merge(common, {
    module: {
        rules: [
            // css assets loaders
            {
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                }),
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([config.PUBLIC_DIR_NAME]),
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
