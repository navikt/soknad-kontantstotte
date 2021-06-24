import express from 'express';
import proxy from 'express-http-proxy';
import path from 'path';
import fs from 'fs';
import url from 'url';

const port = 8000;
const app = express();

app.use(
    '/soknad-kontantstotte-api/api/',
    proxy('localhost:8080', {
        proxyReqPathResolver: function (req) {
            return `/api${url.parse(req.url).path}`;
        },
        parseReqBody: false,
    })
);

app.get('/api/feature', function (req, res) {
    res.send(fs.readFileSync(path.join(__dirname, '/mock/toggles.json')));
});

app.listen(port, 'localhost', () => {
    console.info('=== Dev-server startet på http://localhost:%s/', port);
});
