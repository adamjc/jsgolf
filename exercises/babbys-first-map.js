const babbysFirstMap = {
  title: 'Babby\'s First Map',
  description: 'Produce a function that takes a map and returns an array of values of the keys',
  tests: [{
    'id': 0,
    'testInput': [{
      a: 1,
      b: 2,
      c: 3
    }],
    'expectedOutput': [1, 2, 3]
  }, {
    'id': 1,
    'testInput': [{
      a: -10,
      b: 5,
      c: 90
    }],
    'expectedOutput': [-10, 5, 90]
  }, {
    'id': 2,
    'testInput': [{
      a: 'Hello',
      b: 'These',
      c: 'Are',
      d: 'The',
      e: 'Values'
    }],
    'expectedOutput': ['Hello', 'These', 'Are', 'The', 'Values']
  }],
  next: 'n-parameters'
}

module.exports = babbysFirstMap
