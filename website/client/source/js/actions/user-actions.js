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

  authorise () {
    let self = this
    let requestOptions = {
      uri: `${location.origin}/api/is-authorised`,
      method: 'GET',
      headers: {
        'Authorization': localStorage.getItem('jwt')
      }
    }

    requestPromise(requestOptions)
      .then(result => {
        debugger
        if (result !== "OK") self.actions.signOut()
      }).catch(errorMessage => {
        console.error(errorMessage)
      })
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
        result.username = userInfo.username
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
