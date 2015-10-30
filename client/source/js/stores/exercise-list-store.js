var alt = require('../alt');

var ExerciseListActions = require('../actions/exercise-list-actions');

class ExerciseListStore {
    constructor() {
        this.bindListeners({
            handleUpdateExerciseList: ExerciseListActions.UPDATE_EXERCISE_LIST
        });
    }

    handleUpdateExerciseList(data) {
        this.exerciseList = data;
    }
}

module.exports = alt.createStore(ExerciseListStore, 'ExerciseListStore');
