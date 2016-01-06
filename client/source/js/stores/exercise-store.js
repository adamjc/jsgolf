const alt = require('../alt');
const ExerciseActions = require('../actions/exercise-actions');

class ExerciseStore {
    constructor() {
        this.exerciseButtonClicked = null;

        this.bindListeners({
            handleUpdateExercise: ExerciseActions.UPDATE_EXERCISE,
        });
    }

    handleUpdateExercise(exercise) {
        this.exercise = exercise;
    }
}

module.exports = alt.createStore(ExerciseStore, 'ExerciseStore');
