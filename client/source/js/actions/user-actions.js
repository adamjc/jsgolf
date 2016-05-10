'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}`
const signInUrl = `${baseUrl}/api/sign-in`

class UserActions {
    updateUser(data) {
        this.dispatch(data)
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

    // TODO: Pass through JWT.
    signIn(userInfo) {
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
            .then(results => this.actions.updateUser('sign in success'))
            .catch(errorMessage => console.error(errorMessage))
    }
}

module.exports = alt.createActions(UserActions)
