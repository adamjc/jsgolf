var Sandbox = require('Sandbox');

var s = new Sandbox();

var userFunc = 'function () { return "Hello World"; }';

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
func = func.replace('testInput', 1);
func = func.replace('testOutput', 2);

console.log(func);

s.run(func, function(o) {
    var x = o.result.split('');
    x.pop();
    x.shift();
    x = x.join('');
    console.log(JSON.parse(x));
});
