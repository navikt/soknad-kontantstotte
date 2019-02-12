const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const delayMs = 1000;
const app = express();
const upload = multer();

function lesMockFil(filnavn) {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
}

app.get('/soknad-kontantstotte-api/api/tekster/nb', function(req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/status/ping', function(req, res) {
    setTimeout(() => res.status(200).send(), delayMs);
});

app.get('/api/feature', function(req, res) {
    setTimeout(() => res.send(lesMockFil('toggles.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/soker', function(req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('soker.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/barn', function(req, res) {
    setTimeout(() => res.status(200).send(lesMockFil('barn.json')), delayMs);
});

app.post('/soknad-kontantstotte-api/api/sendinn', function(req, res) {
    setTimeout(() => res.send(lesMockFil('innsending-respons.json')), delayMs);
});

app.post('/soknad-kontantstotte-api/api/vedlegg/', upload.single('file'), function(req, res) {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    const randomDelay = Math.random() * (3000 - delayMs) + delayMs;
    const sizeLimit = 20 * 1024 * 1024; // 20mb

    if (req.file.size > sizeLimit) {
        setTimeout(() => res.status(413).send(), randomDelay);
        return;
    }

    setTimeout(() => res.send({ vedleggsId: uuid, filnavn: req.file.originalname }), randomDelay);
});

module.exports = app;
