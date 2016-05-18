'use strict'

const publicExercises = require('../utils/exercise-utils').publicExercises

/* Returns the list of exercises available. */
function getExercise(req, res) {
    let exerciseTitle = req.params.exercise
    let fullExercise

    Object.keys(publicExercises).forEach((exercise) => {
        let exerciseFilename = publicExercises[exercise]

        if (exerciseFilename === exerciseTitle) {
            fullExercise = require('../exercises/' + exerciseFilename)
            fullExercise.url = `/exercises/${exerciseFilename}`
        }
    })

    if (fullExercise) {
        res.json(fullExercise)
    } else {
        res.status(500).send('500')
    }
}

module.exports = getExercise
