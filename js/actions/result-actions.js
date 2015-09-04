var alt = require('../alt');
var ResultsFetcher = require('../utils/results-fetcher');
var requestPromise = require('request-promise');

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }

    fetchResults(exercise, answer) {
        var url = 'http://localhost:3000/exercise/1';
        var requestOptions = {
            uri: url,
            body: answer,
            method: 'POST'
        };

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        answer = 'helloooooo!';

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
