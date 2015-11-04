var addOne = {
    number: 2,
    title: "Exercise 2 - Add One",
    description: "Produce a function that takes a Number, and adds 1 to it.",
    tests: [{
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
    }]
};

module.exports = addOne;
