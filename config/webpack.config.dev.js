const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const webpack = require('webpack');
const path = require('path');


const package = require('../package.json');
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: '/',
    assetsPath: '/assets'
};

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        'assets/js/app': [PATHS.src + '/js'],
        'assets/js/vendors': Object.keys(package.dependencies)

    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: PATHS.publicPath
    },
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
        rules: [{
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
                    href: PATHS.assetsPath + "/css/main.css",
                    rel: 'stylesheet',
                    type: 'text/css'
                },
            ],
            scripts: [PATHS.assetsPath + '/js/all.min.js', PATHS.assetsPath + '/js/app.js']
                // scripts: [PATHS.assetsPath + '/js/app.js']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false)
        })
    ],
    devServer: {
        contentBase: 
            PATHS.dist + '/'
        ,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8080,
        publicPath: 'http://localhost:8080/',
        hot: true,
        watchContentBase: true,
        historyApiFallback: true,
        watchOptions: {
            poll: true
        }
    },
    stats: {
        children: false
    }
};