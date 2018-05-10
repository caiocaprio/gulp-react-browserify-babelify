const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: '/',
    assetsPath: '/assets'
};


module.exports = merge(common,{
    mode: 'development',
    optimization: {
        runtimeChunk: 'single',
        // runtimeChunk: false,
        // splitChunks: false,
        splitChunks: {
            cacheGroups: {
                'assets/js/vendors': {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'assets/js/vendors',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/scss')
        }
    },
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: 'css-loader',
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader/url" },
                    { loader: "file-loader" }
                ]
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',

            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(path.join(PATHS.assetsPath, '/css/main.css')),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            // PRODUCTION: JSON.stringify(true)
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    stats: {
        children: false
    }
});