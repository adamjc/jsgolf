var express = require('express');
var Sandbox = require('sandbox');
var bodyParser = require('body-parser');
var Q = require('Q');
var app = express();
var _ = require('lodash');

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.render('index', {title: 'Test', message: 'Hello World!'});
});

app.get('/exercise/:exercise/', (req, res) => {
    var exerciseData = getExerciseData(req.params.exercise);

    if (exerciseData) {
        res.render('exercise', { exerciseData: exerciseData });
    } else {
        res.status(404).send('404: Nah m8.');
    }
});

app.get('/exercise', (req, res) => {
    var exercises = []
    Object.keys(exerciseMap).forEach((exercise) => {
        exercises.push(require('./exercises/' + exerciseMap[exercise]));
    });

    res.render('exercises', {title: 'Exercises', message: 'Exercises', exercises: exercises});
});

app.post('/exercise/:exercise/', (req, res) => {
    var exerciseData = getExerciseData(req.params.exercise);

    if (!exerciseData) {
        res.status(500).send('500: Nah m8.');
        return;
    }

    var sandbox = new Sandbox();
    var results = [];
    var testData = Object.keys(exerciseData.testData);
    var processData = () => {
        var promises = Q();

        testData.forEach((testDataElement, index) => {
            promises = promises.then(() => {
                var deferred = Q.defer();

                // TODO: Correctly data structure test inputs and test outputs.

                var func = '(function(){ \
                                var input = parseInt(testInput) || testInput; \
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

                var testInput = testData[index];
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
                        resultObject.correct = _.isEqual(resultObject.output, exerciseData.testData[testData[index]]);
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

var exerciseMap = {
    '1': 'exercise_1_hello-world.js',
    '2': 'exercise_2_add-one.js',
    '3': 'exercise_3_times-n.js',
    '4': 'exercise_4_fizz-buzz.js',
    '5': 'exercise_5_fibonacci.js'
};

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
