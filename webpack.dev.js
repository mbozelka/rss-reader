
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config/defaults');

module.exports = merge(common, {
    module: {
        rules: [
            // css assets loaders
            {
                use: [
                    {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ],
                test: /\.scss$/
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            exclude: ['vendor.js']
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: config.PORT
    }
});