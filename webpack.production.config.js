//author @huntbao
var path = require('path');
module.exports = {
    entry: './dev/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.styl$/,
                exclude: /(node_modules)/,
                loader: 'style-loader!css-loader!stylus-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}

