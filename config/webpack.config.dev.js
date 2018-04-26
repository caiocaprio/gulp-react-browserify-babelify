const package = require('../package.json');
const webpack = require('webpack');


function fromRootDir(matchPath) {
    return new RegExp(process.cwd() + matchPath);
}

const PATHS = require('../config/vars');

module.exports = {
    // mode: 'development',
    // entry: {
    //     // 'vendors': Object.keys(package.dependencies),
    //     'app': 'src/js/index.js'
    // },
    output: {
        filename: '[name].js',
        publicPath: '/'
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
    cache: true, 
    // debug: true,
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
            
            './node_modules',
            './src/js',
        ],
        extensions: ['.js', '.jsx', '.jsm'],
    }

}



