'use strict'

const alt = require('../alt')
const socket = require('socket.io-client')(location.origin)

class ResultActions {
    updateResults(results) {
        this.dispatch(results)
    }

    fetchResults(exercise, answer) {
        this.dispatch()

        socket.emit('postExercise', {
            exercise: exercise,
            answer: answer
        })

        socket.once('postedExercise', results => this.actions.updateResults(results))
    }
}

module.exports = alt.createActions(ResultActions)
