const palindrome = {
  title: 'Palindrome',
  description: 'Produce a function that takes a string and returns true if it is a palindrome and false if it is not',
  tests: [{
    'id': 0,
    'testInput': ['horse'],
    'expectedOutput': false
  }, {
    'id': 1,
    'testInput': ['mum'],
    'expectedOutput': true
  }, {
    'id': 2,
    'testInput': ['racecar'],
    'expectedOutput': true
  }, {
    'id': 3,
    'testInput': ['avid diva'],
    'expectedOutput': true
  }, {
    'id': 4,
    'testInput': ['this is not a palindrome'],
    'expectedOutput': false
  }, {
    'id': 5,
    'testInput': ['powerglove 9000'],
    'expectedOutput': false
  }],
  next: 'circular-array'
}

module.exports = palindrome
