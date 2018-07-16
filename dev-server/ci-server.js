const app = require('./common.server');
const express = require('express');
const path = require('path');

const port = 8000;

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

app.listen(port, 'localhost', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('=== Dev-server startet på http://localhost:%s/', port);
});
