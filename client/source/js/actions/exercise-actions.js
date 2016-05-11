'use strict'

const alt = require('../alt')
const requestPromise = require('request-promise')
const url = location.origin + '/api/exercises/'

class ExerciseActions {
    updateExercise(data) {
        this.dispatch(data)
    }

    getExercise(number) {
        let requestOptions = {
            uri: url + number,
            method: 'GET'
        }

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch()

        requestPromise(requestOptions)
            .then(results => this.actions.updateExercise(JSON.parse(results)))
            .catch(errorMessage => console.error(errorMessage))
    }
}

module.exports = alt.createActions(ExerciseActions)
