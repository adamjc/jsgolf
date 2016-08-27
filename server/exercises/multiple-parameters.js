const multipleParams = {
    title: "Multiple Parameters",
    description: "Produce a function that takes two numbers and returns the sum of both",
    tests: [{
        'id': 0,
        'testInput': [
            1,
            1
        ],
        'expectedOutput': 2
    }, {
        'id': 1,
        'testInput': [
            2,
            2
        ],
        'expectedOutput': 4
    }, {
        'id': 2,
        'testInput': [
            -10,
            10
        ],
        'expectedOutput': 20
    }, {
        'id': 3,
        'testInput': [
            100,
            100
        ],
        'expectedOutput': 200
    }]
}

module.exports = multipleParams
