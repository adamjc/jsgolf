

const publicExercises = require('../utils/exercise-utils').publicExercises
const ddbUtils = require('../utils/ddb-utils')
const logger = require('../utils/logger')

/* Returns the list of exercises available. */
function getExercise(req, res) {
    let exerciseTitle = req.params.exercise
    let fullExercise

    Object.keys(publicExercises).forEach((exercise) => {
        let exerciseFilename = publicExercises[exercise]

        if (exerciseFilename === exerciseTitle) {
            fullExercise = require(`../exercises/${exerciseFilename}`)
            fullExercise.url = `/exercises/${exerciseFilename}`
        }
    })

    if (fullExercise) {
        ddbUtils.getExercise(exerciseTitle).then(data => {
            fullExercise.chartData = data
            res.json(fullExercise)
        }).catch(reason => logger.log('error', `getExercise Endpoint Error: ${reason}`))
    } else {
        res.status(500).send('500')
    }
}

module.exports = getExercise
