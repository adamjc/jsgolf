var winston = require('winston')

var transports = [
  new (winston.transports.File)({
    name: 'info-file',
    filename: 'jsgolf-info.log',
    level: 'info'
  }),
  new (winston.transports.File)({
    name: 'error-file',
    filename: 'jsgolf-error.log',
    level: 'error'
  })
]

if (process.env.NODE_ENV === 'debug') {
  transports.push(new (winston.transports.Console)())
}

var logger = new (winston.Logger)({
  transports: transports
})

module.exports = logger
