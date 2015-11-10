'use strict';

const React = require('react');
const ExerciseInput = require('./exercise-input.jsx');
const Result = require('./result.jsx');
const ExerciseStore = require('../stores/exercise-store');

module.exports = React.createClass({
    getInitialState() {
        return {
            exercise: this.props.exercise
        };
    },

    componentDidMount() {
        ExerciseStore.listen(this.onChange);
    },

    componentWillUnmount() {
        ExerciseStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        let result;

        if (this.state.answerSubmitted) {
             result = <Result />;
        }

        return(
            <div>
                <ExerciseInput exercise={this.state.exercise}/>

                {result}
            </div>
        );
    }
})
