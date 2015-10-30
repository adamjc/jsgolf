'use strict';

var React = require('react');

var ExerciseListStore = require('../stores/exercise-list-store');
var ExerciseListActions = require('../actions/exercise-list-actions');

module.exports = React.createClass({
    getInitialState() {
        return {
            exerciseList: ''
        };
    },

    componentDidMount() {
        ExerciseListStore.listen(this.onChange);
        ExerciseListActions.getExerciseList();
    },

    componentWillUnmount() {
        ExerciseListStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
        console.log(state);
    },

    render() {
        var exercises;

        if (this.state.exerciseList) {
            exercises = this.state.exerciseList.map(function(exercise) {
                return <li>
                           <a href={exercise.url}>{exercise.title}</a>
                       </li>
            });
        }


        return(
            <div>
                {exercises}
            </div>
        );
    }
})
