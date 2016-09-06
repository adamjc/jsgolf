const logger = require('../utils/logger')
const ddbUtils = require('../utils/ddb-utils')
const jwt = require('jsonwebtoken')
const passwordUtils = require('../utils/password-utils')

/* Returns the list of exercises available. */
function getExercisesList(req, res) {
  let authHeader = req.headers.authorization
  let authentication
  let completedExercises
  let exercises

  if (authHeader !== 'null') {
    authentication = jwt.verify(authHeader, passwordUtils.getSecret())  
  }

  if (authentication) {
    ddbUtils.getUser(authentication.username).then(user => {
      completedExercises = Object.keys(user.exercises).map(a => a.replace(new RegExp('_', 'g'), '-'))
      return completedExercises
    }).then(buildExercisesList)
      .then(exercises => res.json(exercises))
  } else {
    exercises = buildExercisesList()
    res.json(exercises)
  }
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
