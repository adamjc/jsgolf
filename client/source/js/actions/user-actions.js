'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}`
const signInUrl = `${baseUrl}/api/sign-in`

class UserActions {
    updateUser (data) {
        this.dispatch(data)
    }

    getUser (userName) {
        let requestOptions = {
            uri: `${getUserUrl}/${userName}`,
            method: 'GET'
        }

        requestPromise(requestOptions)
            .then(isUsernameAvailable => this.actions.userAvailable(isUsernameAvailable))
            .catch(errorMessage => console.error(errorMessage))
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

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch()

        requestPromise(requestOptions)
            .then(result => this.actions.updateUser(result))
            .catch(errorMessage => console.error(errorMessage))
    }
}

module.exports = alt.createActions(UserActions)
