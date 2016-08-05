'use strict'

const publicExercises = require('../utils/exercise-utils').publicExercises
const ddbUtils = require('../utils/ddb-utils')

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
        // TODO: This is causing tests to fail. Need a mock db.
        ddbUtils.getExercise(exerciseTitle).then(data => {
            fullExercise.chartData = data
            res.json(fullExercise)
        }).catch(reason => console.log('getExercise Endpoint Error: ', reason))
    } else {
        res.status(500).send('500')
    }
}

module.exports = getExercise
