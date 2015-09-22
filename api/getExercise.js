'use strict';

var fs = require('fs');

var exerciseMap = require('../utils/exercise-map');

/* Returns the list of exercises available. */
function getExercise(req, res) {
    var exerciseNumber = req.params.exercise;
    var fullExercise;

    Object.keys(exerciseMap).forEach((exercise) => {
        if (exercise === exerciseNumber) {
            fullExercise = require('../exercises/' + exerciseMap[exercise]);
            fullExercise.url = '/exercises/' + fullExercise.number;
        }
    });

    if (fullExercise) {
        res.json(fullExercise);
    } else {
        res.status(500).send('500');
    }
};

module.exports = getExercise;
