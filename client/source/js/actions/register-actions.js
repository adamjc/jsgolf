'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}/api`
const registerUrl = `${baseUrl}/register`
const getUserUrl = `${baseUrl}/is-username-available`
const page = require('page')

class RegisterActions {
  updateRegister(data) {
    this.dispatch(data)
  }

  userAvailable(isUsernameAvailable) {
    this.dispatch(isUsernameAvailable)
  }

  getUser(userName) {
    let requestOptions = {
      uri: `${getUserUrl}/${userName}`,
      method: 'GET'
    }

    requestPromise(requestOptions)
      .then(isUsernameAvailable => this.actions.userAvailable(isUsernameAvailable))
      .catch(errorMessage => console.error(errorMessage))
  }

  register(userInfo) {
    let requestOptions = {
      uri: registerUrl,
      method: 'POST',
      body: {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email
      },
      json: true
    }

    // we dispatch an event here so we can have a 'loading' event.
    this.dispatch()

    requestPromise(requestOptions)
      .then(() => {
        page('/sign-in')
      })
      .catch(errorMessage => console.error(errorMessage))
  }
}

module.exports = alt.createActions(RegisterActions)
