'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const baseUrl = `${location.origin}/api`
const registerUrl = `${baseUrl}/register`
const getUserUrl = `${baseUrl}/get-user`

class ExerciseActions {
    updateRegister(data) {
        this.dispatch(data)
    }

    gotUser(data) {
        this.dispatch(data);
    }

    getUser(userName) {
        let requestOptions = {
            uri: `${getUserUrl}/${userName}`,
            method: 'GET'
        }

        requestPromise(requestOptions)
            .then(user => this.actions.gotUser(user))
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
        this.dispatch();

        requestPromise(requestOptions)
            .then(results => this.actions.updateRegister('register success'))
            .catch(errorMessage => console.error(errorMessage));
    }
}

module.exports = alt.createActions(ExerciseActions);
