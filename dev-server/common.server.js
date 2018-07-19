const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 1000;
const app = express();

function lesMockFil(filnavn) {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
}

app.get('/soknad-kontantstotte-api/api/barn', function(req, res) {
    setTimeout(() => res.send(lesMockFil('barn.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/tekster', function(req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('/soknad-kontantstotte-api/api/status/ping', function(req, res) {
    setTimeout(() => res.status(200).send(), delayMs);
});

app.post('/soknad-kontantstotte-api/api/sendinn', function(req, res) {
    setTimeout(() => res.status(204).send(), delayMs);
});

module.exports = app;
