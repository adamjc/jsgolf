module.exports = {
  title: 'Arabic To Roman',
  description: 'Make a function that takes in arabic numbers and gives you roman ones',
  tests: [{
    'id': 0,
    'testInput': [
      1
    ],
    'expectedOutput': 'I'
  }, {
    'id': 1,
    'testInput': [
      4
    ],
    'expectedOutput': 'IV'
  }, {
    'id': 2,
    'testInput': [
      1500
    ],
    'expectedOutput': 'MD'
  }, {
    'id': 3,
    'testInput': [
      1986
    ],
    'expectedOutput': 'MCMLXXXVI'
  }]
}
