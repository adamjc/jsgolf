var express = require('express');
var Sandbox = require('sandbox');
var bodyParser = require('body-parser');
var Q = require('Q');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index', {title: 'Test', message: 'Hello World!'});
});

var exerciseMap = {
    '1': 'exercise_1_hello-world.js',
    '2': 'exercise_2_add-one.js',
    '3': 'exercise_3_times-n.js',
    '4': 'exercise_4_fizz-buzz.js',
    '5': 'exercise_5_fibonacci.js'
};

app.get('/exercise/:exercise/', function(req, res) {
    var exerciseToLoad = exerciseMap[req.params.exercise];
    var exercise;
    var testDataAnswers;
    if (exerciseToLoad) {
        exercise = './exercises/' + exerciseToLoad;
        exerciseData = require(exercise);
    } else {
        res.status(500).send('Nah m8');
        return;
    }

    res.render('exercise', exerciseData);
});

app.post('/exercise/:exercise/', function(req, res) {
    var exerciseToLoad = exerciseMap[req.params.exercise];
    var exercise;
    var testDataAnswers;
    if (exerciseToLoad) {
        exercise = './exercises/' + exerciseToLoad;
        exerciseData = require(exercise);
    } else {
        res.status(500).send('Nah m8');
        return;
    }

    var sandbox = new Sandbox();
    var results = [];
    var testData = Object.keys(exerciseData.testData);

    var userFunc = req.body.testFunc;

    var func = '(function(){ \
                    var input = testInput; \
                    var expectedOutput = testOutput; \
                    var output = usersFunc(output); \
                    var correct = assert.deepEqual(expectedOutput, result); \
                    var result = { \
                        "output" : output, \
                        "input" : input, \
                        "correct" : correct, \
                    }; \
                    return "" + JSON.stringify(result); + "" \
                })()';

    var processData = function() {
        var promises = Q();

        testData.forEach(function (testDataElement, index) {
            promises = promises.then(function () {
                var deferred = Q.defer();

                var testInput = testData[index];
                testInput = wrapWithQuotesIfString(testInput);

                var testOutput = exerciseData.testData[testData[index]];
                testOutput = wrapWithQuotesIfString(testOutput);

                var newFunc;
                newFunc = func.replace("usersFunc", userFunc);
                newFunc = newFunc.replace('testInput', testInput);
                newFunc = newFunc.replace('testOutput', testOutput);

                sandbox.run(newFunc, function(output) {
                    var result;
                    result = output.result.split('');
                    result.pop();
                    result.shift();
                    result = result.join('');

                    results[index] = JSON.parse(result);

                    deferred.resolve();
                });

                return deferred.promise;
            });
        });

        return promises;
    };

    processData().then(function () {
        res.send(results);
    });
});

/**
 * As we are replacing strings, when doing so, we have to wrap it
 * with quotes, as otherwise it will just dump e.g. Hello World,
 * without the quotes, so it won't be valid JS, and you get Syntax Error
 */
var wrapWithQuotesIfString = function(input) {
    if (typeof input === 'string') {
        return "'" + input + "'";
    }

    return input;
}

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
