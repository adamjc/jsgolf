'use strict'

const publicExercises = require('../utils/public-exercises')

/* Returns the list of exercises available. */
function getExercise(req, res) {
    let exerciseTitle = req.params.exercise
    let fullExercise

    publicExercises.forEach((exercise) => {
        if (exercise === exerciseTitle) {
            fullExercise = require('../exercises/' + exercise)
            fullExercise.url = `/exercises/${exercise}`
        }
    })

    if (fullExercise) {
        res.json(fullExercise)
    } else {
        res.status(500).send('500')
    }
}

module.exports = getExercise
