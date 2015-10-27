'use strict';

var React = require('react');

var ExerciseListStore = require('../stores/exercise-list-store');
var ExerciseListActions = require('../actions/exercise-list-actions');

module.exports = React.createClass({
    getInitialState() {
        return {
            exerciseList: 'example...'
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
        return(
            <div>
                // for each!
                {this.state.exerciseList.title}
                {this.state.exerciseList.url}
            </div>
        );
    }
})
