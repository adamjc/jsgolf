var alt = require('../alt');
var ResultsFetcher = require('../utils/results-fetcher');

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }

    fetchResults() {
        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        ResultFetcher.fetch()
            .then((results) => {
                this.actions.updateResults(results);
            })
            .catch((errorMessage) => {
                this.actions.resultsFailed(errorMessage);
            });
    }

    resultsFailed() {
        this.dispatch(errorMessage);
    }
}

module.exports = alt.createActions(ResultActions);
