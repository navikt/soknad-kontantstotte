const express = require('express');
const path = require('path');
const fs = require('fs');

const delayMs = 1000;
const app = express();

function lesMockFil(filnavn) {
    return fs.readFileSync(path.join(__dirname, '/mock/' + filnavn), 'UTF-8');
}

app.get('/kontantstotte-api/api/tekster/nb', function(req, res) {
    setTimeout(() => res.send(lesMockFil('tekster.json')), delayMs);
});

app.get('/kontantstotte-api/api/status/ping', function(req, res) {
    setTimeout(() => res.status(200).send(), delayMs);
});

app.get('/kontantstotte-api/api/person', function(req, res) {
    setTimeout(() => res.send(lesMockFil('person.json')), delayMs);
});

app.get('/api/feature', function(req, res) {
    setTimeout(() => res.send(lesMockFil('toggles.json')), delayMs);
});

app.post('/kontantstotte-api/api/sendinn', function(req, res) {
    setTimeout(() => res.status(204).send(), delayMs);
});

module.exports = app;
