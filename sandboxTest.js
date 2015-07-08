var Sandbox = require('Sandbox');

var s = new Sandbox();

var userFunc = 'function (i) { return i + 1; }';

// HNNNNG...
var func = '(function(){ \
                var input = testInput; \
                var expectedOutput = testOutput; \
                var result = usersFunc(input); \
                var correct = expectedOutput == result; \
                var x = { \
                    "result" : result, \
                    "input" : input, \
                    "correct" : correct, \
                }; \
                return "" + JSON.stringify(x); + "" \
            })()';

func = func.replace("usersFunc", userFunc);
func = newFunc.replace('testInput', 1);
func = newFunc.replace('testOutput', 2);

s.run(newFunc, function(o) {
    var x = o.result.split('');
    x.pop();
    x.shift();
    x = x.join('');
    console.log(JSON.parse(x));
});
