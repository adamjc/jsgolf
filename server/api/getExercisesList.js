'use strict';

var fs = require('fs');

var exerciseMap = require('../utils/exercise-map');

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
    var fetchedExercise;
    var fullExercise;
    var exercises = [];

    Object.keys(exerciseMap).forEach((exercise) => {
        fullExercise = require('../exercises/' + exerciseMap[exercise]);

        fetchedExercise = {};
        fetchedExercise.title = fullExercise.title;
        fetchedExercise.url = '/exercises/' + fullExercise.number;

        exercises.push(fetchedExercise);
    });

    res.json(exercises);
};

module.exports = getExercisesList;
