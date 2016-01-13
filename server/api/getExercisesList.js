'use strict';

const exerciseMap = require('../utils/exercise-map');

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
    let exercises = [];

    Object.keys(exerciseMap).forEach((exercise) => {
        let fullExercise = require('../exercises/' + exerciseMap[exercise]);
        let fetchedExercise = {
            id: fullExercise.number,
            title: fullExercise.title,
            url: '/exercises/' + fullExercise.number
        };

        exercises.push(fetchedExercise);
    });

    res.json(exercises);
}

module.exports = getExercisesList;
