var alt = require('../alt');

class ResultActions {
    updateResults(results) {
        this.dispatch(results);
    }
}

module.exports = alt.createActions(ResultActions);
