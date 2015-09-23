'use strict';

var Sandbox = require('sandbox');
var Q = require('Q');
var _ = require('lodash');

var exerciseMap = require('../utils/exercise-map');

var results = [];

function postExercise(req, res) {
    var exerciseData = getExerciseData(req.params.exercise);
    var exercises = [];
    var userFunction;

    if (!exerciseData) {
        res.status(500).send('Exercise data not found.');
        return;
    }

    if (req.body) {
        userFunction = req.body.userFunction;
    }

    return Promise.resolve(processData(userFunction, exerciseData).then(() => {
        res.json(results);
    }));
}

function processData(userFunction, exerciseData) {
    var promises = Q();
    var tests = exerciseData.tests;
    var sandbox = new Sandbox();

    Object.keys(tests).forEach((testDataElement, index) => {
        promises = promises.then(() => {
            var deferred = Q.defer();
            var parsedFunction;
            var testInput;
            var func = '(function(){ \
                            var input = testInput; \
                            var output = usersFunction(input); \
                            var result = { \
                                "output" : output, \
                                "input" : input, \
                            }; \
                            return "" + JSON.stringify(result); + "" \
                        })()';

            parsedFunction = func.replace('usersFunction', userFunction);
            testInput = tests[index].testInput;
            testInput = wrapWithQuotesIfString(testInput);
            parsedFunction = parsedFunction.replace('testInput', testInput);

            sandbox.run(parsedFunction, (output) => {
                var result;
                var resultObject = {};

                result = output.result.split('');
                result.pop();
                result.shift();
                result = result.join('');

                try {
                    resultObject = JSON.parse(result);
                    resultObject.correct = _.isEqual(resultObject.output, exerciseData.tests[index].expectedOutput);
                } catch (e) {
                    console.log('Error:', e);
                    resultObject.output = 'Error';
                }

                results[index] = resultObject;

                deferred.resolve();
            });

            return deferred.promise;
        });
    });

    return promises;
}

/**
 * As we are replacing strings, we have to wrap it with quotes as otherwise it
 * will just dump e.g. Hello World without quotes - it won't be valid JS.
 */
function wrapWithQuotesIfString(input) {
    if (typeof input === 'string') {
        return "'" + input + "'";
    }

    return input;
}

function getExerciseData(exercise) {
    var exerciseToLoad = exerciseMap[exercise];
    var exercise;

    if (exerciseToLoad) {
        exercise = '../exercises/' + exerciseToLoad;
        return require(exercise);
    } else {
        return null;
    }
}

module.exports = postExercise;
