var alt = require('../alt');
var ExerciseActions = require('../actions/exercise-actions');

class ExerciseStore {
    constructor() {
        this.exerciseButtonClicked = null;

        this.bindListeners({
            handleUpdateExercise: ExerciseActions.UPDATE_EXERCISE,
            handleUpdateExerciseList: ExerciseActions.UPDATE_EXERCISE_LIST
        });
    }

    handleUpdateExercise() {
        this.answerSubmitted = true;
    }

    handleUpdateExerciseList() {

    }
}

module.exports = alt.createStore(ExerciseStore, 'ExerciseStore');
