var path = require('path');

module.exports = {
    entry: './app.jsx',
    output: {
        publicPath: 'http://localhost:7070/assets',
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
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.styl$/,
                exclude: /(node_modules)/,
                loader: 'style-loader!css-loader!stylus-loader'
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