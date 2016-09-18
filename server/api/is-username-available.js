const ddbUtils = require('../utils/ddb-utils')

function isUsernameAvailable (req, res) {
  ddbUtils.getUser(req.params.username).then(data => {
    if (!data) res.send(true)

    res.send(false)
  })
}

module.exports = isUsernameAvailable
