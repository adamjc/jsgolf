const logger = require('../utils/logger')
const ddbUtils = require('../utils/ddb-utils')
const jwt = require('jsonwebtoken')
const passwordUtils = require('../utils/password-utils')

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
  let authHeader = req.headers.authorization

  let jwtPromise = new Promise((resolve, reject) => {
    try {
      let authentication = jwt.verify(authHeader, passwordUtils.getSecret())
      resolve(authentication)
    } catch (e) {
      res.json(buildExercisesList())
    }
  })

  jwtPromise.then(auth => ddbUtils.getUser(auth.username))
            .then(user => Object.keys(user.exercises).map(a => a.replace(new RegExp('_', 'g'), '-')))
            .then(buildExercisesList)
            .then(exercises => res.json(exercises))
}

function buildExercisesList(completedExercises) {
  let exercises = []
  const publicExercises = require('../utils/exercise-utils').publicExercises

  Object.keys(publicExercises).forEach(exercise => {
    let exerciseFilename = publicExercises[exercise]
    let fullExercise = require(`../exercises/${exerciseFilename}`)

    let fetchedExercise = {
      id: exerciseFilename,
      title: fullExercise.title,
      url: `/exercises/${exerciseFilename}`
    }

    if (completedExercises && completedExercises.indexOf(exerciseFilename)) {
      fetchedExercise.completed = true
    }

    exercises.push(fetchedExercise)
  })

  return exercises
}

module.exports = getExercisesList
