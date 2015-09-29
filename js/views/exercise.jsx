'use strict';

var React = require('react');

var ExerciseInput = require('./exercise-input.jsx');
var Result = require('./result.jsx');

var ExerciseStore = require('../stores/exercise-store');

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
        var result;

        if (this.state.exerciseButtonClicked) {
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
