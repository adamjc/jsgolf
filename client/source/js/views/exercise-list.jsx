'use strict';

const React = require('react');
const ExerciseListStore = require('../stores/exercise-list-store');
const ExerciseListActions = require('../actions/exercise-list-actions');

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
        let exercises;

        if (this.state.exerciseList) {
            exercises = this.state.exerciseList.map((exercise) => {
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
