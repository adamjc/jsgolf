const publicExercises = require('../utils/exercise-utils').publicExercises
const ddbUtils = require('../utils/ddb-utils')
const logger = require('../utils/logger')
const R = require('ramda')

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
      fullExercise.tableData = data

      if (fullExercise.tableData) {
        fullExercise.tableData.scores = parseScores(fullExercise.tableData.scores)
      }

      res.json(fullExercise)
    }).catch(reason => logger.log('error', `getExercise Endpoint Error: ${reason}`))
  } else {
    res.status(500).send('500')
  }
}

function parseScores (scores) {
  let sortedUsers = R.take(10, R.keys(scores).sort((a, b) => scores[a] - scores[b]))
  let parsedScores = {}

  sortedUsers.forEach(a => parsedScores[a] = scores[a])

  return parsedScores
}

module.exports = getExercise
