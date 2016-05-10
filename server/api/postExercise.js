'use strict'

const Sandbox = require('adamjc-sandbox')
const _ = require('lodash')
const exerciseMap = require('../utils/exercise-map')

let maxSandboxes = 10
let sandboxes = []
let requests = []

for (let i = 0; i < maxSandboxes; i++) {
    let s = new Sandbox({ timeout: 10000 })
    sandboxes.push(s)
}

process.on('socketDisconnected', socket => {
    // find the socket's request, if it has one.
    let request = requests.map((r, i) => {
        return r.socket.id === socket.id ? i : null
    }).filter(e => e !== null)

    if (request) requests.splice(request, 1)
})

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

        request.socket.emit('postedExercise', results)
        process.emit('sandboxFinished')
    })
})

function postExercise(socket, data) {
    if (!data) {
        socket.emit('500: data not found.')
        return
    }

    let userAnswer = data.answer
    let exerciseData = getExerciseData(data.exercise)

    if (!userAnswer || !exerciseData) {
        socket.emit('500: data not found.')
        return
    }

    let exerciseRequest = {
        socket: socket,
        exercise: exerciseData,
        userAnswer: userAnswer
    }

    process.emit('exercisePosted', exerciseRequest)
}

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

function getExerciseData(exercise) {
    let exerciseToLoad = exerciseMap[exercise]

    if (exerciseToLoad) return require('../exercises/' + exerciseToLoad)

    return null
}

module.exports = postExercise
