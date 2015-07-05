var express = require('express');
var Sandbox = require('sandbox');
var bodyParser = require('body-parser');
var Q = require('Q');
var app = express();

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index', {title: 'Test', message: 'Hello World!'});
});

var addOneTestData = {
    '1': 2,
    '0': 1,
    '-1': 0,
    '100': 101
};

app.post('/exercise/:exercise/', function(req, res) {
    var s = new Sandbox();
    var result = [];
    var testFunc = "(" + req.body.testFunc + ")";
    var handler = function(output) {
        console.log('outputResult: ' + output.result);
        result[i] = output.result;
    };

    var addOneTestDataKeys = Object.keys(addOneTestData);
    for (var i = 0; i < addOneTestDataKeys.length; i++) {
        console.log('index: ' + addOneTestDataKeys[i]);
        var testInput = testFunc + "(" + addOneTestData[addOneTestDataKeys[i]] + ")";
        s.run(testInput, handler);
    }

    console.log(result);
    res.send(result);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
