const package = require('../package.json');
const webpack = require('webpack');

const PATHS = require('../config/vars');

module.exports = {
    // mode: 'production',
    // entry: {
    //     'vendors': Object.keys(package.dependencies),
    //     'app': 'index.js'
    // },
    output: {
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        // alias: {
        //     styles: path.resolve(__dirname, '../src/scss')
        // }
    },
    // optimization: {
    //     runtimeChunk: 'single',
    //     // runtimeChunk: false,
    //     // splitChunks: false,
    //     splitChunks: {
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendors',
    //                 enforce: true,
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    devtool: 'eval',
    module: {
        rules: [{
            test: /.(jsx,js)?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        'env',
                        { modules: false },
                    ],
                ],
            }
        }]
    },
    resolve: {
        modules: [
            'src/js',
            'node_modules',
        ],
        extensions: ['.js', '.jsx', '.jsm'],
    }

}



