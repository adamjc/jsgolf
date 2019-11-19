const circularArray = {
  title: 'Circular Array',
  description: `
    Given an index, and an array, generate the incremental index. 
    For example:
      f(1, [a, b, c]) -> 2,
      f(2, [a, b, c]) -> 0
  `,
  tests: [{
    'id': 0,
    'testInput': [2, [1, 2, 3]],
    'expectedOutput': 0
  }, {
    'id': 1,
    'testInput': [0, [1]],
    'expectedOutput': 0
  }, {
    'id': 2,
    'testInput': [2, [1, 2, 3, 4, 5]],
    'expectedOutput': 3
  }, {
    'id': 3,
    'testInput': [4, [1, 2, 3, 4, 5, 6]],
    'expectedOutput': 5
  }],
  next: undefined
}

module.exports = circularArray
