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
  }, {
    'id': 4,
    'testInput': [
      1999
    ],
    'expectedOutput': 'MCMXCIX'
  }, {
    'id': 5,
    'testInput': [
      2000
    ],
    'expectedOutput': 'MM'
  }, {
    'id': 6,
    'testInput': [
      3000
    ],
    'expectedOutput': 'MMM'
  }, {
    'id': 7,
    'testInput': [
      3999
    ],
    'expectedOutput': 'MMMCMXCIX'
  }, {
    'id': 8,
    'testInput': [
      1337
    ],
    'expectedOutput': 'MCCCXXXVII'
  }, {
    'id': 9,
    'testInput': [
      44
    ],
    'expectedOutput': 'XLIV'
  }, {
    'id': 10,
    'testInput': [
      43
    ],
    'expectedOutput': 'XLIII'
  }, {
    'id': 11,
    'testInput': [
      1066
    ],
    'expectedOutput': 'MLXVI'
  }],
  next: 'palindrome'
}
