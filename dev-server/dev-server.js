const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.dev');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        colors: true
    },
    before(app) {
        app.use((req, res, next) => {
            next();
        });
    }
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(8000, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8000');
});