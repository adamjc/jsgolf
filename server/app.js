'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const  _ = require('lodash');
const path = require('path');
const getExerciseList = require('./api/getExercisesList');
const getExercise = require('./api/getExercise');
const postExercise = require('./api/postExercise');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
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

let server = app.listen(app.get('port'), () => {
    let port = server.address().port;

    console.log('jsgolf listening at http://localhost:%s', port);
});
