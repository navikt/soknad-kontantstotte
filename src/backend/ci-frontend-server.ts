import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';
import mustacheExpress from 'mustache-express';
import path from 'path';
import environment from './environment';

dotenv.config();
const app = express();
const basePath = process.env.BASE_PATH ?? '/';
const frontendMappe = path.join(process.cwd(), 'dist');

app.set('views', frontendMappe);
app.set('view engine', 'mustache');

app.engine('html', mustacheExpress());
app.use(compression());
// Static files
app.use(basePath, express.static(frontendMappe, { index: false }));

// Serve index.html
app.get('/', (req, res) => res.render('index.html'));

// Nais functions
app.get(/^\/(internal\/)?(isAlive|isReady)\/?$/, (_req, res) => res.sendStatus(200));

// Fallback, alt vi ikke treffer med andre handlere returnerer index.html
app.get('*', (req, res) => res.render('index.html'));

console.log(`Starting server on localhost: http://localhost:${environment().port}${basePath}`);

app.listen(environment().port);
