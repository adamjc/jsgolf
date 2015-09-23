'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var path = require('path');

var getExerciseList = require('./api/getExercisesList');
var getExercise = require('./api/getExercise');
var postExercise = require('./api/postExercise');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

/* Returns the list of exercises available. */
app.get('/api/exercises', getExerciseList);

/* Fetches data around the exercise, e.g. title, problem. */
app.get('/api/exercises/:exercise', getExercise);

/* Calculates answer and returns array of results. */
app.post('/api/exercises/:exercise', postExercise);

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/react/index.html');
});

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
