const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 1000;
const app = express();

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
    setTimeout(() => res.send(lesMockFil('soker.json')), delayMs);
});

app.post('/soknad-kontantstotte-api/api/sendinn', function(req, res) {
    setTimeout(() => res.send(lesMockFil('innsending-respons.json')), delayMs);
});

module.exports = app;
