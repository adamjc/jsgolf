const ddbUtils = require('../utils/ddb-utils')
const jwt = require('jsonwebtoken')
const passwordUtils = require('../utils/password-utils')
const fs = require('fs')
const exerciseFilenames = fs.readdirSync('./server/exercises').map(filename => filename.split('.')[0])

async function getExercisesList (req, res) {
  const authorized = jwt.verify(req.headers.authorization, passwordUtils.getSecret())
  const user = await ddbUtils.getUser(authorized.username)
  const completedExercises = Object.keys(user.exercises).map(a => a.replace(new RegExp('_', 'g'), '-'))
  res.json(buildExercisesList(completedExercises))
}

function buildExercisesList (completedExercises = []) {
  const exercises = exerciseFilenames.map(exerciseFilename => {
    const exercise = require(`../exercises/${exerciseFilename}.js`)
    const userHasCompletedExercise = completedExercises.includes(exerciseFilename) ? true : false

    return {
      id: exerciseFilename,
      title: exercise.title,
      url: `/exercises/${exerciseFilename}`,
      completed: userHasCompletedExercise
    }
  })

  return exercises
}

module.exports = getExercisesList
