const ddbUtils = require('../utils/ddb-utils')
const passwordUtils = require('../utils/password-utils')
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')

function signIn (req, res) {
  logger.log(`attempting to log in user ${req.body.username}`)

  ddbUtils.getUser(req.body.username).then(user => {
    if (!user) {
      logger.log('info', `user: ${user}, no user found.`)
      res.status(401).send('Incorrect username')
      return
    }

    passwordUtils.hash(req.body.password, user.salt).then(hash => {
      if (hash !== user.password) {
        logger.log('info', `user: ${user}, password does not match.`)
        res.status(401).send('Incorrect password')
        return
      }

      let token = jwt.sign(user, passwordUtils.getSecret(), {
        expiresIn: "7d"
      })

      res.status(200).send({ success: true, token: `${token}` })
    })
  }).catch(err => logger.log('error', err))

}

module.exports = signIn
