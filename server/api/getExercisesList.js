'use strict'

const publicExercises = require('../utils/public-exercises')

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
    let exercises = []

    publicExercises.forEach((exercise) => {
        let fullExercise = require('../exercises/' + exercise)
        let webTitle = fullExercise.title.toLowerCase().split(' ').join('-')

        let fetchedExercise = {
            id: fullExercise.webTitle,
            title: fullExercise.title,
            url: `/exercises/${webTitle}`
        }

        exercises.push(fetchedExercise)
    })

    res.json(exercises)
}

module.exports = getExercisesList
