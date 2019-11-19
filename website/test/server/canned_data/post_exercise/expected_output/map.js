module.exports = [{
    'id': 0,
    'input': [{
        a: 1,
        b: 2,
        c: 3
    }],
    'expectedOutput': [1, 2, 3],
    'output': [1, 2, 3],
    "correct": true
}, {
    'id': 1,
    'input': [{
        a: -10,
        b: 5,
        c: 90
    }],
    'expectedOutput': [-10, 5, 90],
    'output': [-10, 5, 90],
    "correct": true
}, {
    'id': 2,
    'input': [{
        a: "Hello",
        b: "These",
        c: "Are",
        d: "The",
        e: "Values"
    }],
    'expectedOutput': ["Hello", "These", "Are", "The", "Values"],
    'output': ["Hello", "These", "Are", "The", "Values"],
    "correct": true
}];
