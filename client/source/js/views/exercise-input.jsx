'use strict';

const React = require('react');
const ReactAddons = require('react-addons');
const brace = require('brace');
const AceEditor = require('react-ace');
const ResultActions = require('../actions/result-actions');
const ExerciseActions = require('../actions/exercise-actions');

require('brace/mode/javascript');
require('brace/theme/monokai');

module.exports = React.createClass({
    getInitialState() {
        return {
            answer: ''
        };
    },

    onChange(answer) {
        this.state.answer = answer;
    },

    handleClick() {
        ResultActions.fetchResults(this.props.exercise, this.state.answer);
    },

    render() {
        return (
            <div className="exercise-input col-sm-6">
                <AceEditor
                    className="exercise-input__editor"
                    mode="javascript"
                    theme="monokai"
                    name="editor"
                    height=""
                    width=""
                    onChange={this.onChange}
                />

                <button
                    className="exercise-input__button btn btn-block"
                    onClick={this.handleClick}>
                    GO
                </button>
            </div>
        )
    }
});
