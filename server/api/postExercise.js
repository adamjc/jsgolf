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
    let sandbox = new Sandbox();

    Object.keys(tests).forEach((element, index) => {
        let promise = new Promise((resolve, reject) => {
            let parsedFunction;
            let func = '(function(){\
                            var output = (usersFunction)(testInputPlaceholder);\
                            var result = {\
                                "id": idPlaceholder,\
                                "output": output,\
                                "input": [inputPlaceholder]\
                            };\
                            return "" + JSON.stringify(result); + ""\
                        })()';

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

            parsedFunction = func.replace('usersFunction', userFunction);
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
