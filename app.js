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

    // e.g. foo(){} -> (foo(){})
    var usersFunc = "(" + req.body.testFunc + ")";

    var processData = function() {
        var promises = Q();

        testData.forEach(function (testDataElement, index) {
            promises = promises.then(function () {
                // e.g. (foo(){}) -> (foo(){})(testData[index])
                var input = usersFunc + "(" + testData[index] + ")";
                var deferred = Q.defer();

                sandbox.run(input, function(output) {
                    var correct = output.result == exerciseData.testData[testData[index]];
                    console.log(output.result, output.result.length, exerciseData.testData[testData[index]].length);
                    results[index] = {
                        input: testData[index],
                        output: output.result,
                        correct: correct
                    };

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

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
