const helloWorld = {
  title: 'Hello World',
  description: 'Produce a function returns the string \'Hello World!\'.',
  tests: [{
    'id': 0,
    'testInput': [''],
    'expectedOutput': 'Hello World!'
  }, {
    'id': 1,
    'testInput': ['test'],
    'expectedOutput': 'Hello World!'
  }],
  next: 'add-one'
}

module.exports = helloWorld
