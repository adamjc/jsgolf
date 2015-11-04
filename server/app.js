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
app.use('/public', express.static(path.resolve(__dirname, '../public')));

/* Returns the list of exercises available. */
app.get('/api/exercises', getExerciseList);

/* Fetches data around the exercise, e.g. title, problem. */
app.get('/api/exercises/:exercise', getExercise);

/* Calculates answer and returns array of results. */
app.post('/api/exercises/:exercise', postExercise);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.set('port', (process.env.PORT || 5000));

var server = app.listen(app.get('port'), () => {
    var port = server.address().port;

    console.log('jsgolf listening at http://localhost:%s', port);
});
