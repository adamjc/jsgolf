const jwt = require('jsonwebtoken')
const passwordUtils = require('../utils/password-utils')
const logger = require('../utils/logger')

function isAuthorised (req, res) {
  let authentication
  let authHeader = req.headers.authorization

  if (authHeader) {
    try {
      authentication = jwt.verify(authHeader, passwordUtils.getSecret())
    } catch (e) {
      logger.log('error', e)
      res.sendStatus(401)
    }

    if (authentication && authentication.username) res.sendStatus(200)
  }
}

module.exports = isAuthorised
