'use strict';

const alt = require('../alt');
const requestPromise = require('request-promise');
const config = require('../config');
const url = config.host + '/api/exercises/';

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }

    fetchResults(exercise, answer) {
        let requestOptions = {
            uri: url + exercise,
            json: {
                answer: answer
            },
            method: 'POST'
        };

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        requestPromise(requestOptions)
            .then((results) => {
                this.actions.updateResults(results);
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
            });
    }

    resultsFailed() {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(ResultActions);
