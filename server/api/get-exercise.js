const fs = require('fs')
const R = require('ramda')
const exercises = fs.readdirSync('./server/exercises').map(filename => filename.split('.')[0])
const ddbUtils = require('../utils/ddb-utils')

async function getExercise(req, res) {
  const exerciseTitle = req.params.exercise

  if (exercises.includes(exerciseTitle)) {
    let fullExercise = require(`../exercises/${exerciseTitle}.js`)
    fullExercise.url = `/exercises/${exerciseTitle}`
    fullExercise.nextExerciseUrl = `/exercises/${fullExercise.next}`
    fullExercise.tableData = await ddbUtils.getExercise(exerciseTitle)

    if (fullExercise.tableData) {
      fullExercise.tableData.scores = parseScores(fullExercise.tableData.scores)
    }

    res.json(fullExercise)
  } else {
    res.status(500).send('500')
  }
}

function parseScores (scores) {
  let sortedUsers = R.take(10, R.keys(scores).sort((a, b) => scores[a].characters - scores[b].characters))
  let parsedScores = {}

  sortedUsers.forEach(a => parsedScores[a] = scores[a])

  return parsedScores
}

module.exports = getExercise
