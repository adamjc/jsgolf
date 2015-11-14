'use strict';

const React = require('react');
const ExerciseListStore = require('../stores/exercise-list-store');
const ExerciseListActions = require('../actions/exercise-list-actions');
const page = require('page');

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

    handleOnClick(e) {
        if (e.target.href) {
            page(e.target.href);
        }
    },

    render() {
        let exercises;

        if (this.state.exerciseList) {
            exercises = this.state.exerciseList.map(exercise => {
                return (
                    <li key={exercise.number}>
                        <a onClick={this.handleOnClick} href={exercise.url}>{exercise.title}</a>
                    </li>
                );
            });
        }

        return(
            <div>
                {exercises}
            </div>
        );
    }
})
