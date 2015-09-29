'use strict';

var alt = require('../alt');
var requestPromise = require('request-promise');

var baseUrl = 'http://localhost:3000/api/exercises/';

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }

    fetchResults(exercise, answer) {
        var requestOptions = {
            uri: baseUrl + exercise,
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
