const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    entry: {
        'assets/js/app': [PATHS.src + '/js']
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: PATHS.publicPath
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: '../node_modules/html-webpack-template/index.ejs',
            title: 'Nextel Production',
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
            scripts: [PATHS.assetsPath + '/js/app.js']
                // scripts: [PATHS.assetsPath + '/js/app.js']
        })
    ]
    
};