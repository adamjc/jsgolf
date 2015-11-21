'use strict';

const Sandbox = require('adamjc-sandbox');
const _ = require('lodash');
const exerciseMap = require('../utils/exercise-map');
const socket = require('socket.io');

let maxSandboxes = 10;
let sandboxes = [];
let requests = [];

for (let i = 0; i < maxSandboxes; i++) {
    let s = new Sandbox({ timeout: 10000 });
    sandboxes.push(s);
};

process.on('sandboxFinished', () => {
    process.emit('attemptToProcess');
})

process.on('exercisePosted', exerciseRequest => {
    requests.unshift(exerciseRequest);

    process.emit('attemptToProcess');
});

process.on('attemptToProcess', () => {
    if (!sandboxes.length || !requests.length) return;

    let sandbox = sandboxes.pop();
    let request = requests.pop();

    Promise.all(processData(sandbox, request)).then(results => {
        sandboxes.push(sandbox);

        request.socket.emit('postedExercise', results);
        process.emit('sandboxFinished');
    });
});

function postExercise(socket, data) {
    if (!data) {
        socket.emit('500: data not found.');
        return;
    }

    let userAnswer = data.answer
    let exerciseData = getExerciseData(data.exercise);

    if (!userAnswer || !exerciseData) {
        socket.emit('500: data not found.');
        return;
    }

    let exerciseRequest = {
        socket: socket,
        exercise: exerciseData,
        userAnswer: userAnswer
    };

    process.emit('exercisePosted', exerciseRequest);

    return;
}

function processData(sandbox, request) {
    let promises = [];
    let tests = request.exercise.tests;

    Object.keys(tests).forEach((element, index) => {
        let promise = new Promise((resolve, reject) => {
            let parsedFunction;
            let func = `(function(){
                            var output = (usersFunction)(testInputPlaceholder);
                            var result = {
                                "id": idPlaceholder,
                                "output": output,
                                "input": [inputPlaceholder]
                            };
                            return "" + JSON.stringify(result); + ""
                        })()`;

            tests[index].testInput.forEach(input => {
                let testInputIndex = func.indexOf('testInputPlaceholder');
                let inputIndex = func.indexOf('inputPlaceholder') + 1;
                let testInput = getCorrectFormat(input);
                func = func.split('');
                func.splice(testInputIndex, 0, testInput + ', ');
                func.splice(inputIndex, 0, testInput + ', ');
                func = func.join('');
            });

            let testInputIndex = func.indexOf(', testInputPlaceholder');
            func = func.split('');
            func.splice(testInputIndex, ', testInputPlaceholder'.length);
            func = func.join('');

            let inputIndex = func.indexOf(', inputPlaceholder');
            func = func.split('');
            func.splice(inputIndex, ', inputPlaceholder'.length);
            func = func.join('');

            func = func.replace('idPlaceholder', index);

            parsedFunction = func.replace('usersFunction', request.userAnswer);
            sandbox.run(parsedFunction, (output) => {
                let result;
                let resultObject = {};

                result = output.result.split('');
                result.pop();
                result.shift();
                result = result.join('');

                try {
                    resultObject = JSON.parse(result);
                    resultObject.correct = _.isEqual(resultObject.output, tests[index].expectedOutput);
                } catch (e) {
                    console.error('Error parsing result object: ', result, e);
                    resultObject.output = 'Error';
                }

                resolve(resultObject);
            });
        });

        promises.push(promise);
    });

    return promises;
}

function getCorrectFormat(input) {
    if (_.isArray(input)) {
        return "[" + input + "]";
    };

    if (typeof input === 'string') {
        return "'" + input + "'";
    }

    if (typeof input === 'object') {
        return JSON.stringify(input);
    }

    return input;
}

function getExerciseData(exercise) {
    let exerciseToLoad = exerciseMap[exercise];
    let exerciseData;

    if (exerciseToLoad) {
        exerciseData = '../exercises/' + exerciseToLoad;
        return require(exerciseData);
    } else {
        return null;
    }
}

module.exports = postExercise;
