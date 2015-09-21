'use strict';

var ExerciseInput = require('./exercise-input.jsx');
var React = require('react');

module.exports = React.createClass({
    getInitialState() {
        return {
            exercise: this.props.exercise
        };
    },

    render() {
        return(
            <div>
                <ExerciseInput exercise={this.state.exercise}/>
            </div>
        );
    }
})
