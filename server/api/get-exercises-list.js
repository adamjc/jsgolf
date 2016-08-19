const publicExercises = require('../utils/exercise-utils').publicExercises

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
    let exercises = []

    Object.keys(publicExercises).forEach((exercise) => {
        let exerciseFilename = publicExercises[exercise]
        let fullExercise = require(`../exercises/${exerciseFilename}`)

        let fetchedExercise = {
            id: exerciseFilename,
            title: fullExercise.title,
            url: `/exercises/${exerciseFilename}`
        }

        exercises.push(fetchedExercise)
    })

    res.json(exercises)
}

module.exports = getExercisesList
