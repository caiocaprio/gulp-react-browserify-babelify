module.exports = {
    // mode: 'production',
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
    // devtool: 'eval',
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ]
    },
 }