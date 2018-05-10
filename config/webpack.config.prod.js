const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.config.js');
const merge = require('webpack-merge');
const webServer = require('./webpackWebServer.config.js');

// const package = require('../package.json');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: './',
    assetsPath: '/assets' 
};


module.exports = merge(common,{
    // bail:true,
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: false,
        splitChunks: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/scss')
        }
    },
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
        new ExtractTextPlugin(path.join(PATHS.publicPath, PATHS.assetsPath, '/css/main.css')),
        new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Nextel',
            favicon: '../src/img/favicon.ico',
            meta: [{ name: 'robots', content: 'noindex,nofollow' }],
            appMountIds: ['app'],
            inject: false,
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            mobile: true,
            links: [

                {
                    href: PATHS.publicPath+ PATHS.assetsPath + "/css/main.css",
                    rel: 'stylesheet',
                    type: 'text/css'
                },
            ],
            scripts: [PATHS.publicPath + PATHS.assetsPath + '/js/all.min.js']
            // scripts: [PATHS.assetsPath + '/js/app.js']
        }),
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // new HtmlWebpackIncludeAssetsPlugin({
        //     assets: [
        //         PATHS.src + '/public/js/main.js'
        //     ],
        //     append: false,
        //     publicPath: PATHS.publicPath + PATHS.assetsPath
        // }),
        // new CopyWebpackPlugin([{
        //         from: path.join(PATHS.src, PATHS.assetsPath, '/img'),
        //         to: path.join(PATHS.dist, PATHS.assetsPath, '/img')
        //     },
        //     {
        //         from: path.join(PATHS.src, '/third-party'),
        //         to: path.join(PATHS.dist, PATHS.assetsPath, '/third-party'),
        //         ignore: ['*.scss',
        //             '*.sass',
        //             '*.css',
        //             '*.map',
        //             '*.sh',
        //             '*.enc',
        //             '*.yml',
        //             '*.md',
        //             '*.html',
        //             '*.json',
        //             '*.pdf',
        //             '*.js',
        //             '*.xml',
        //             '*.gitignore',
        //             '*.gitattributes',
        //             '*.editorconfig',
        //             '*.stylelintignore',
        //             '*.stylelintrc',
        //             '*.lock',
        //             '*.txt',
        //             '*.nuspec',
        //             '*.htmllintrc',
        //             '*.eslintignore'
        //         ]

        //     }
        // ]),
        new webpack.DefinePlugin({
            // PRODUCTION: JSON.stringify(true)
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});