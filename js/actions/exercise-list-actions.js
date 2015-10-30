'use strict';

var alt = require('../alt');
var requestPromise = require('request-promise');

var baseUrl = 'http://localhost:5000/api/exercises/';

class ExerciseListActions {
    updateExerciseList(data) {
        this.dispatch(data)
    }

    getExerciseList(data) {
        var requestOptions = {
            uri: baseUrl,
            method: 'GET'
        };

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        requestPromise(requestOptions)
            .then((results) => {
                this.actions.updateExerciseList(JSON.parse(results));
            })
            .catch((errorMessage) => {
                console.log(errorMessage);
            });

        this.actions.updateExerciseList(data);
    }
}

module.exports = alt.createActions(ExerciseListActions);
