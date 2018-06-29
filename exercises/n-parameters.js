const nParams = {
  title: 'N Parameters',
  description: 'Produce a function that takes any amount of numbers and returns the sum of all',
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
      2,
      2
    ],
    'expectedOutput': 6
  }, {
    'id': 2,
    'testInput': [
      -10,
      10,
      100,
      200,
      300
    ],
    'expectedOutput': 600
  }, {
    'id': 3,
    'testInput': [
      0
    ],
    'expectedOutput': 0
  }],
  next: 'arabic-to-roman'
}

module.exports = nParams
