const logger = require('../utils/logger')
const ddbUtils = require('../utils/ddb-utils')
const jwt = require('jsonwebtoken')
const passwordUtils = require('../utils/password-utils')

/* Returns the list of exercises available. */
function getExercisesList (req, res) {
  const jwtPromise = new Promise(resolve => {
    try {
      const authorized = jwt.verify(req.headers.authorization, passwordUtils.getSecret())
      resolve(authorized)
    } catch (e) {
      logger.log('error', e)
      res.json(buildExercisesList())
    }
  })

  jwtPromise.then(auth => ddbUtils.getUser(auth.username))
            .then(user => Object.keys(user.exercises).map(a => a.replace(new RegExp('_', 'g'), '-')))
            .then(buildExercisesList)
            .then(exercises => res.json(exercises))
}

function buildExercisesList (completedExercises = []) {
  const publicExercises = require('../utils/exercise-utils').publicExercises
  const exercises = Object.keys(publicExercises).map(exerciseTitle => {
    const exerciseFilename = publicExercises[exerciseTitle]
    const userHasCompletedExercise = (completedExercises.indexOf(exerciseFilename) >= 0)
    const exerciseCompleted = userHasCompletedExercise ? true : false

    return {
      id: exerciseFilename,
      title: exerciseTitle,
      url: `/exercises/${exerciseFilename}`,
      completed: exerciseCompleted
    }
  })

  return exercises
}

module.exports = getExercisesList
