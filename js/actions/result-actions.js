var alt = require('../alt');
var ResultsFetcher = require('../utils/results-fetcher');
var rp = require('request-promise');

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }

    fetchResults() {
        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        rp('http://localhost:3000/test')
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
