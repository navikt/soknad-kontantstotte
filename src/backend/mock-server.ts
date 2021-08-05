import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { URL } from 'url';

const delayMs = 1;
const app = express();
const upload = multer();

app.use(function (req, res, next) {
    const origin = req.hostname === 'ci-api-mock' ? 'ci-frontend' : req.hostname;
    res.header('Access-Control-Allow-Origin', `http://${origin}:9000`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const h1 = 'Access-Control-Allow-Origin';
const h1value = req => `http://${req.hostname}:9000`;
const h2 = 'Access-Control-Allow-Headers';
const h2value = 'Origin, X-Requested-With, Content-Type, Accept';

function lesMockFil(filnavn) {
    const base = import.meta.url;
    return fs.readFileSync(new URL('../../mock/' + filnavn, base));
}

app.get('/soknad-kontantstotte-api/api/tekster', function (req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/land', function (req, res) {
    setTimeout(() => res.send(lesMockFil('land.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/status/ping', function (req, res) {
    setTimeout(() => res.send('pong'), delayMs);
});

app.get('/api/feature', function (req, res) {
    setTimeout(() => res.send(lesMockFil('toggles.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/soker', function (req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('soker.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/barn', function (req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('barn.json')), delayMs);
});

app.post('/soknad-kontantstotte-api/api/sendinn', function (req, res) {
    setTimeout(() => res.send(lesMockFil('innsending-respons.json')), delayMs);
});

app.post('/soknad-kontantstotte-api/api/vedlegg/', upload.single('file'), function (req, res) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    const randomDelay = Math.random() * (3000 - delayMs) + delayMs;
    const sizeLimit = 20 * 1000 * 1000; // 20mb

    // Out of memory
    // @ts-ignore
    if (req.file.size > sizeLimit * 3) {
        setTimeout(() => res.status(500).send(), randomDelay);
        return;
    }

    // Filen er for stor
    // @ts-ignore
    if (req.file.size > sizeLimit) {
        setTimeout(() => res.status(413).send(), randomDelay);
        return;
    }

    // @ts-ignore
    setTimeout(() => res.send({ vedleggsId: uuid, filnavn: req.file.originalname }), randomDelay);
});

export default app;
