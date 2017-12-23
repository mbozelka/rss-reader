const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const config = require('./config/defaults');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        bundle: config.DEV_ENTRY,
        vendor: config.VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, config.PUBLIC_DIR_NAME),
        filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },

            // image assets loaders
            {
                use: [
                    {
                        loader: 'file-loader',
                        options: {limit: config.MAX_INT_IMAGE_SIZE}
                    }
                ],
                test: config.IMG,
            },

            // Fonts assets loaders
            {
                use: [{loader: 'file-loader'}],
                test: config.FONTS,
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules'
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: config.HTML_TEMP
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.ExternalsPlugin('commonjs', [
            'electron'
        ])
    ]

};