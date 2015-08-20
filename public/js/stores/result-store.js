var alt = require('../alt');
var ResultActions = require('../actions/result-actions');

class LocationStore {
    constructor() {
        this.results = [];

        this.bindListenders({
            handleUpdateResults: ResultActions.UPDATE_RESULTS
        });
    }

    handleUpdateResults(results) {
        this.results = results;
    }
}

module.exports = alt.createStore(ResultStore, 'ResultStore');
