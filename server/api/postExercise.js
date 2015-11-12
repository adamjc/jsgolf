'use strict';

const Sandbox = require('sandbox');
const _ = require('lodash');
const exerciseMap = require('../utils/exercise-map');

function postExercise(req, res) {
    let exerciseData = getExerciseData(req.params.exercise);
    let userFunction;

    if (!(exerciseData && req.body && req.body.answer)) {
        res.status(500).send('Exercise data not found.');
        return;
    }

    userFunction = req.body.answer;

    return Promise.all(processData(userFunction, exerciseData)).then((results) => {
        res.json(results);
    });
}

function processData(userFunction, exerciseData) {
    let promises = [];
    let tests = exerciseData.tests;
    let sandbox = new Sandbox({
        timeout: 5000
    });

    Object.keys(tests).forEach((element, index) => {
        let promise = new Promise((resolve, reject) => {
            let testInput = getCorrectFormat(tests[index].testInput);
            let parsedFunction;
            let func = '(function(){ \
                            var input = testInput; \
                            var output = usersFunction(input); \
                            var result = { \
                                "output" : output, \
                                "input" : input, \
                            }; \
                            return "" + JSON.stringify(result); + "" \
                        })()';

            parsedFunction = func.replace('usersFunction', userFunction);
            parsedFunction = parsedFunction.replace('testInput', testInput);

            sandbox.run(parsedFunction, (output) => {
                let result;
                let resultObject = {};

                result = output.result.split('');
                result.pop();
                result.shift();
                result = result.join('');

                try {
                    resultObject = JSON.parse(result);
                    resultObject.correct = _.isEqual(resultObject.output, exerciseData.tests[index].expectedOutput);
                } catch (e) {
                    console.log('Error parsing result object: ', result, e);
                    resultObject.output = 'Error';
                }

                resolve(resultObject);
            });
        });

        promises.push(promise);
    });

    return promises;
}

/**
 * As we are replacing strings, we have to wrap it with quotes as otherwise it
 * will just dump e.g. Hello World without quotes - it won't be valid JS.
 */
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
