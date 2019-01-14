const express = require('express');
const proxy = require('express-http-proxy');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');
const path = require('path');

const port = 8000;
const app = express();

const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.use(
    '/soknad-kontantstotte-api/api/',
    proxy('localhost:8080', {
        proxyReqPathResolver: function(req) {
            return `/api${require('url').parse(req.url).path}`;
        },
    })
);

app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
    res.end();
});

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== Dev-server startet på http://localhost:%s/', port);
});
