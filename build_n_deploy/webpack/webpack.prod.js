const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TeserPlugin = require('terser-webpack-plugin');
const path = require('path');

const config = merge.strategy({
    'entry.soknad-kontantstotte': 'prepend',
    'module.rules': 'append',
    optimization: 'append',
})(common, {
    mode: 'production',
    entry: {
        'soknad-kontantstotte': ['babel-polyfill', 'url-search-params-polyfill'],
    },
    output: {
        path: path.join(__dirname, '../../production'),
        filename: '[name].[hash].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        },
                    },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                coreModulePath: '"~"',
                                nodeModulesPath: '"~"',
                            },
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TeserPlugin({
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'soknad-kontantstotte.css',
            allChunks: true,
        }),
    ],
});

module.exports = config;
