const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}`
const signInUrl = `${baseUrl}/api/sign-in`
const page = require('page')

class UserActions {
  updateUser (data) {
    this.dispatch(data)
  }

  awaitingResults (signInInfo) {
    this.dispatch(signInInfo)
  }

  signIn (userInfo) {
    let requestOptions = {
      uri: signInUrl,
      method: 'POST',
      body: {
        username: userInfo.username,
        password: userInfo.password
      },
      json: true
    }

    requestPromise(requestOptions)
      .then(result => {
        this.actions.updateUser(result)
        page('/exercises')
      }).catch(errorMessage => {
        this.actions.awaitingResults({
          awaitingResults: false,
          signInError: true
        })
        console.error(errorMessage)
      })
  }

  signOut () {
    this.dispatch()
  }
}

module.exports = alt.createActions(UserActions)
