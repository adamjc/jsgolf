const addOne = {
    number: 2,
    title: "Exercise 2 - Add One",
    description: "Produce a function that takes a Number, and adds 1 to it.",
    tests: [{
        'id': 0,
        'testInput': [1],
        'expectedOutput': 2
    }, {
        'id': 1,
        'testInput': [-1],
        'expectedOutput': 0
    }, {
        'id': 2,
        'testInput': [0.5],
        'expectedOutput': 1.5
    }, {
        'id': 3,
        'testInput': [999],
        'expectedOutput': 1000
    }]
};

module.exports = addOne;
