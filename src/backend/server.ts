import path from 'path';

import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import mustacheExpress from 'mustache-express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import projectWebpackDevConfig from '../webpack/webpack.development.config';
import { indexHandler } from './dekorator';
import environment from './environment';
import { escapeBody } from './escape';
import { createApiForwardingFunction } from './proxy';

dotenv.config();
const app = express();

const basePath = process.env.BASE_PATH ?? '/';
const frontendMappe = path.join(process.cwd(), 'dist');

app.set('views', frontendMappe);
app.set('view engine', 'mustache');

app.engine('html', mustacheExpress());
app.use(compression());

app.use(`${basePath}api/soknad`, express.json());
app.use(`${basePath}api/soknad`, escapeBody);
app.use(`${basePath}api`, createApiForwardingFunction());

app.get('/', indexHandler);

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    // @ts-ignore
    const compiler = webpack(projectWebpackDevConfig);
    const devMiddlewareOptions = {
        // Vi må write to disk for at index.html skal havne på et sted der mustacheExpress-renderen kan finne den
        writeToDisk: true,
    };
    app.use(webpackDevMiddleware(compiler, devMiddlewareOptions));
    app.use(webpackHotMiddleware(compiler));
} else {
    // Static files
    app.use(basePath, express.static(frontendMappe, { index: false }));
}

// Nais functions
app.get(/^\/(internal\/)?(isAlive|isReady)\/?$/, (_req, res) => res.sendStatus(200));

// Fallback, alt vi ikke treffer med andre handlere returnerer index.html
app.get('*', indexHandler);

console.log(`Starting server on localhost: http://localhost:${environment().port}${basePath}`);

app.listen(environment().port);
