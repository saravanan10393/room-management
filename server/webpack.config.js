let nodeExternals = require('webpack-node-externals');
let path = require('path')
module.exports = {
    entry : "./app.js",
    output : {
        filename : "app.bundle.js",
        path : "."
    },
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    module : {
        loaders : [
            {
                test : /\.js/,
                exclude : path.resolve(__dirname, "node_modules"),
                loader : "babel-loader"
            }
        ]
    }
}