const AWS = require('aws-sdk')
const ddbUtils = require('../utils/ddb-utils')
const passwordUtils = require('../utils/password-utils')
const logger = require('../utils/logger')

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
})

/* Attempts to register a new user. */
function postRegister (req, res) {
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  let salt = passwordUtils.salt()

  if (!username) {
    return res.status(422).send('No username was provided.')
  }

  if (!password) {
    return res.status(422).send('No password was provided.')
  }

  ddbUtils.getUser(username).then(data => {
    if (data && data.username) {
      logger.log('info', `user ${data.username} already exists`)
      return res.status(422).send('Username already exists.')
    }

    passwordUtils.hash(password, salt).then(hash => {
      ddbUtils.addUser(username, hash, salt, email)
          .then(_ => {
            res.status(200).send()
          }).catch(_ => {
            logger.log('info', `promise rejected: ${data}`)
            res.status(500).send()
          })
    })
  })
}

module.exports = postRegister
