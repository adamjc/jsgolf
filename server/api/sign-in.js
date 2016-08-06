const ddbUtils = require('../utils/ddb-utils')
const passwordUtils = require('../utils/password-utils')
const jwt = require('jsonwebtoken')

function signIn (req, res) {
  console.log(`attempting to log in user ${req.body.username}`)

  ddbUtils.getUser(req.body.username).then(user => {
    if (!user) {
      console.log('no user found.')
      res.status(401).send('Incorrect username')
    }

    passwordUtils.hash(req.body.password, user.salt).then(hash => {
      if (hash !== user.password) {
        console.log('password does not match.')
        res.status(401).send('Incorrect password')
      }

      let token = jwt.sign(user, passwordUtils.getSecret(), {
        expiresIn: 10080
      })

      res.status(200).send({ success: true, token: `${token}` })
    })
  }).catch(err => console.err(err))

}

module.exports = signIn
