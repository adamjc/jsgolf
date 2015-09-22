var express = require('express');
var Sandbox = require('sandbox');
var bodyParser = require('body-parser');
var Q = require('Q');
var app = express();
var _ = require('lodash');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

var getExerciseList = require('./api/getExercisesList.js');
var getExercise = require('./api/getExercise.js');

/* Returns the list of exercises available. */
app.get('/api/exercises', getExerciseList);

/* Fetches data around the exercise, e.g. title, problem. */
app.get('/api/exercises/:exercise', getExercise);

/* Calculates answer and returns array of results. */
app.post('/api/exercises/:exercise', (req, res) => {
    var exercise = req.params.exercise;
    var exerciseData = getExerciseData(exercise);
    var exercises = [];
    var fetchedExercise;

    if (!exerciseData) {
        res.status(500).send('Exercise data not found.');
        return;
    }

    var sandbox = new Sandbox();
    var results = [];
    var tests = exerciseData.tests;
    var processData = () => {
        var promises = Q();

        Object.keys(tests).forEach((testDataElement, index) => {
            promises = promises.then(() => {
                var deferred = Q.defer();

                var func = '(function(){ \
                                var input = testInput; \
                                var output = usersFunction(input); \
                                var result = { \
                                    "output" : output, \
                                    "input" : input, \
                                }; \
                                return "" + JSON.stringify(result); + "" \
                            })()';

                var usersFunction = req.body.testFunc;
                var newFunc;
                newFunc = func.replace('usersFunction', usersFunction);

                var testInput = tests[index].testInput;

                testInput = wrapWithQuotesIfString(testInput);
                newFunc = newFunc.replace('testInput', testInput);

                sandbox.run(newFunc, (output) => {
                    var result;
                    result = output.result.split('');
                    result.pop();
                    result.shift();
                    result = result.join('');

                    var resultObject = {};
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
    };

    processData().then(() => {
        res.send(results);
    });
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/react/index.html');
});

/**
 * As we are replacing strings, when doing so, we have to wrap it
 * with quotes, as otherwise it will just dump e.g. Hello World,
 * without the quotes, so it won't be valid JS, and you get Syntax Error
 */
var wrapWithQuotesIfString = (input) => {
    if (typeof input === 'string') {
        return "'" + input + "'";
    }

    return input;
}

var getExerciseData = (exercise) => {
    var exerciseToLoad = exerciseMap[exercise];

    if (exerciseToLoad) {
        let exercise = './exercises/' + exerciseToLoad;
        return require(exercise);
    } else {
        return undefined;
    }
};

var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
