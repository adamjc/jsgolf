'use strict'

const Sandbox = require('adamjc-sandbox')
const _ = require('lodash')
const exerciseUtils = require('../utils/exercise-utils')
const jwt = require('jsonwebtoken')

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
            let authentication = jwt.verify(request.req.headers.authorization, 'secret');

            if (authentication) {
                // TODO: Update user exercise
                // ddbUtils.getUser(authentication.username)
            }
        }

        process.emit('sandboxFinished')
    })
})

function runTests(sandbox, request) {
    let testResults = []
    let tests = request.exercise.tests

    tests.forEach((test) => {
        let functionString = createFunctionString(test, request.userAnswer)
        let testResult = runTest(sandbox, test, functionString)

        testResults.push(testResult)
    })

    return testResults
}

function createFunctionString(test, userAnswer) {
    let func = `(() => {
                    var output = ({userAnswer})({input})
                    var result = { "output": output }
                    return "" + JSON.stringify(result) + ""
                })()`

    test.testInput.forEach(input => func = func.replace('{input}', formatInput(input) + ', {input}'))

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
                console.error('Error parsing result object: ', result, e)
                resultObject.output = result
            }

            resultObject.input = test.testInput
            resultObject.id = test.id
            resultObject.correct = _.isEqual(resultObject.output, test.expectedOutput)

            resolve(resultObject)
        })
    })
}

function formatInput(input) {
    if (_.isArray(input)) return "[" + input + "]"
    if (typeof input === 'string') return "'" + input + "'"
    if (typeof input === 'object') return JSON.stringify(input)

    return input
}

module.exports = postExercise
