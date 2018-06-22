const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');
const fs = require('fs');

const port = 8000;
const delayMs = 1000;
const app = express();

const compiler = webpack(config);
const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
});

function lesMockFil(filnavn) {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8')
}

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/barn', function(req, res) {
    setTimeout(() => res.send(lesMockFil('barn.json')), delayMs);
});

app.get('/tekster', function(req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('*', (req, res) => {
    res.send(middleware.fileSystem.readFileSync(path.join(__dirname, '/../dist/index.html')));
});

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== Dev-server startet på %s, åpne http://localhost:%s/', port, port);
});