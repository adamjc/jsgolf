'use strict'

const alt = require('../alt')
const request = require('request-promise')
const baseUrl = `${location.origin}/api`
const exerciseUrl = `${baseUrl}/exercises`

class ResultActions {
    updateResults(results) {
        this.dispatch(results)
    }

    resultsFailed() {
        console.log('resultsFailed')
    }

    fetchResults(exercise, answer) {
        this.dispatch()

        let webTitle = exercise.title.toLowerCase().split(' ').join('-')
        let requestOptions = {
            uri: `${exerciseUrl}/${webTitle}`,
            method: 'POST',
            body: {
                exercise: exercise,
                answer: answer
            },
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
            json: true
        }

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch()

        request(requestOptions)
            .then(results => this.actions.updateResults(results))
            .catch(errorMessage => console.error(errorMessage))
    }
}

module.exports = alt.createActions(ResultActions)
