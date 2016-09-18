const babbysFirstReduce = {
  title: 'Babby\'s First Reduce',
  description: 'Produce a function that takes an array returns the sum of all elements',
  tests: [{
    'id': 0,
    'testInput': [
      [1, 1, 1]
    ],
    'expectedOutput': 3
  }, {
    'id': 1,
    'testInput': [
      [999, 1, -500]
    ],
    'expectedOutput': 500
  }, {
    'id': 2,
    'testInput': [
      [-1, -2, -3]
    ],
    'expectedOutput': -6
  }]
}

module.exports = babbysFirstReduce
