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
    'exerciseOne': 'exercise_1_add-one.js'
};

app.post('/exercise/:exercise/', function(req, res) {
    var sandbox = new Sandbox();
    var results = [];
    var testData = Object.keys(testDataAnswers);

    // Wrap the function so it can be executed by the sandbox.
    var usersFunc = "(" + req.body.testFunc + ")";

    var processData = function() {
        var promises = Q();

        addOneTestDataKeys.forEach(function (f, index) {
            promises = promises.then(function () {
                var input = usersFunc + "(" + testData[index] + ")";
                var deferred = Q.defer();

                sandbox.run(testInput, function(output) {
                    results[index] = {
                        input: testData[index],
                        output: output.result,
                        correct: parseInt(testDataAnswers[testData[index]]) === parseInt(output.result)
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
