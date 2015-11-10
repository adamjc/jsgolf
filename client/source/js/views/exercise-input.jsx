'use strict';

const React = require('react');
const ReactAddons = require('react-addons');
const ResultActions = require('../actions/result-actions');
const ExerciseActions = require('../actions/exercise-actions');

module.exports = React.createClass({
    mixins: [ReactAddons.LinkedStateMixin],

    getInitialState() {
        return {
            answer: ''
        };
    },

    handleClick() {
        ResultActions.fetchResults(this.props.exercise, this.state.answer);
        ExerciseActions.exerciseInputClicked(true);
    },

    render() {
        return (
            <div>
                <textarea valueLink={this.linkState('answer')} />
                <button onClick={this.handleClick}>Submit!</button>
            </div>
        )
    }
});
