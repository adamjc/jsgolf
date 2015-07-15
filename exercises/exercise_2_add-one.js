var number = 2;
var title = "Exercise 2 - Add One";
var exerciseText = "Produce a function that takes a Number, and adds 1 to it.";
var tests = [{
    'testInput': 0,
    'expectedOutput': 1
}, {
    'testInput': -1,
    'expectedOutput': 0
}, {
    'testInput': 29,
    'expectedOutput': 30
}, {
    'testInput': 1.5,
    'expectedOutput': 2.5
}, {
    'testInput': -1,
    'expectedOutput': 0
}, {
    'testInput': 'Hello World!',
    'expectedOutput': null
}];

module.exports = {
    number: number,
    title: title,
    tests: tests,
    exerciseText: exerciseText
};
