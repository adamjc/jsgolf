const Sandbox = require('adamjc-sandbox')
const _ = require('lodash')
const R = require('ramda')
const exerciseUtils = require('../utils/exercise-utils')
const ddbUtils = require('../utils/ddb-utils')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const passwordUtils = require('../utils/password-utils')

let maxSandboxes = 10
let sandboxes = []
let requests = []

for (let i = 0; i < maxSandboxes; i++) {
  let s = new Sandbox({ timeout: 10000 })
  sandboxes.push(s)
}

function postExercise(req, res) {
  if (!req.body.answer || !req.body.exercise) {
    res.status(500).send('Nah mate, no results innit.')
    return
  }

  let userAnswer = req.body.answer
  let exerciseData = exerciseUtils.getExerciseData(req.body.exercise.title)

  let exerciseRequest = {
    req: req,
    res: res,
    exercise: exerciseData,
    userAnswer: userAnswer
  }

  process.emit('exercisePosted', exerciseRequest)
}

process.on('sandboxFinished', () => {
  process.emit('attemptToProcess')
})

process.on('exercisePosted', exerciseRequest => {
  requests.unshift(exerciseRequest)

  process.emit('attemptToProcess')
})

process.on('attemptToProcess', () => {
  if (!sandboxes.length || !requests.length) return

  let sandbox = sandboxes.pop()
  let request = requests.pop()

  Promise.all(runTests(sandbox, request)).then(results => {
    sandboxes.push(sandbox)

    request.res.send(results)

    let correctAnswers = results.filter(result => result.correct)

    if (correctAnswers.length === results.length) {
      let authHeader = request.req.headers.authorization
      let authentication

      if (authHeader) authentication = jwt.verify(authHeader, passwordUtils.getSecret())

      if (authHeader && authentication) {
        ddbUtils.getUser(authentication.username).then(user => {
          let exercise = request.req.body.exercise
          let exerciseFilename = exercise.title.toLowerCase().split(' ').join('_')
          let currentScore = request.req.body.answer.length

          let usersPreviousScore = user.exercises[exerciseFilename]
          if (usersPreviousScore && usersPreviousScore.characters <= currentScore) {
            return
          }

          let username = authentication.username
          logger.log('info', `submitting score of ${currentScore} in ${exercise.title} for user: ${username}`)
          ddbUtils.updateExercise(username, exercise.title, request.userAnswer)
          ddbUtils.updateHighscore(exercise.title, username, request.userAnswer)
        }).catch(reason => logger.log('error', `submit exercise error: ${reason}`))
      }
    }

    process.emit('sandboxFinished')
  }).catch(reason => logger.log('error', `submit exercise error: ${reason}`))
})

function runTests(sandbox, request) {
  let tests = R.take(5, _.shuffle(request.exercise.tests))
  let testResults = tests.map(test => {
    let functionString = createFunctionString(test, request.userAnswer)
    let testResult = runTest(sandbox, test, functionString)

    return testResult
  })

  return testResults
}

function createFunctionString(test, userAnswer) {
  let func = `(() => {
                var output = ({userAnswer})({input})
                var result = { "output": output }
                return "" + JSON.stringify(result) + ""
              })()`

  test.testInput.forEach(input => func = func.replace('{input}', `${formatInput(input)}, {input}`))

  func = func.replace(', {input}', '')
  func = func.replace('{userAnswer}', userAnswer)

  return func
}

function runTest(sandbox, test, func) {
  return new Promise((resolve) => {
    sandbox.run(func, output => {
      // '{"output": 3}' => {"output": 3}
      let result = output.result.slice(1, output.result.length - 1)
      let resultObject = {}

      try {
        resultObject = JSON.parse(result)
      } catch (e) {
        logger.log('error', `Error parsing result object: ${result} : ${e}`)
        resultObject.output = result
      }

      resultObject.input = test.testInput
      resultObject.expectedOutput = test.expectedOutput
      resultObject.id = test.id
      resultObject.correct = _.isEqual(resultObject.output, test.expectedOutput)

      resolve(resultObject)
    })
  })
}

function formatInput(input) {
  if (_.isArray(input)) return `[${input}]`
  if (typeof input === 'string') return '\'input\''
  if (typeof input === 'object') return JSON.stringify(input)

  return input
}

module.exports = postExercise
