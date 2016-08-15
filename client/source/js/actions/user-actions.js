'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}`
const signInUrl = `${baseUrl}/api/sign-in`
const page = require('page')

class UserActions {
  updateUser (data) {
    this.dispatch(data)
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
      })
      .catch(errorMessage => console.error(errorMessage))
  }

  signOut () {
    this.dispatch()
  }
}

module.exports = alt.createActions(UserActions)
