const crypto = require('crypto')
const fs = require('fs')
const logger = require('./logger')

const DEFAULT_HASH_SIZE = 256
const secret = process.env.NODE_ENV === 'debug' ? 'secret' : fs.readFileSync(`${process.cwd()}/secret`, 'utf-8')

function getSecret () {
  return secret
}

/* Returns a promise that will resolve to a hash */
function hash (password, salt) {
  return new Promise((resolve) => {
    crypto.pbkdf2(password, salt, 100000, DEFAULT_HASH_SIZE, 'sha256', (err, key) => {
      if (err) logger.log('error', `Error Hashing: ${err}`)
      resolve(key.toString('hex'))
    })
  })
}

function salt (byteSize = DEFAULT_HASH_SIZE) {
  return crypto.randomBytes(byteSize)
}

module.exports = {
  hash,
  salt,
  getSecret
}
