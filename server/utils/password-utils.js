const crypto = require('crypto')
const fs = require('fs')

const DEFAULT_HASH_SIZE = 256
const secret = process.env.NODE_ENV === 'travis' ? 'secret' : fs.readFileSync('../../secret', 'utf-8')

function getSecret () {
  return secret
}

/* Returns a promise that will resolve to a hash */
function hash (password, salt) {
  return new Promise((resolve) => {
    crypto.pbkdf2(password, salt, 100000, DEFAULT_HASH_SIZE, 'sha256', (err, key) => {
      if (err) console.error('Error Hashing', err)
      resolve(key.toString('hex'))
    })
  })
}

function salt (byteSize) {
  this.byteSize = byteSize || DEFAULT_HASH_SIZE

  return crypto.randomBytes(this.byteSize)
}

module.exports = {
  hash,
  salt,
  getSecret
}
