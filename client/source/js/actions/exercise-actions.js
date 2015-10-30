'use strict';

var alt = require('../alt');

class ExerciseActions {
    updateExercise() {
        this.dispatch();
    }

    updateExerciseList(data) {
        this.dispatch(data)
    }

    getExerciseList(data) {
        this.actions.updateExerciseList(data);
    }

    exerciseInputClicked() {
        this.actions.updateExercise();
    }
}

module.exports = alt.createActions(ExerciseActions);
