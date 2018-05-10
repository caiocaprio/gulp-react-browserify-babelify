const path = require('path');
const common = require('./webpack.common.config.js');
const merge = require('webpack-merge');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    publicPath: '/',
    assetsPath: '/assets'
};

module.exports = merge({   
    devServer: {
        contentBase: [
                PATHS.dist + '/',
                PATHS.dist + '/assets/css',
                PATHS.dist + '/assets/js',
        ],            
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
            // aggregateTimeout: 2000
        }
    }
});