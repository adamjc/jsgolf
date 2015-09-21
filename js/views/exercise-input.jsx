'use strict';

var React = require('react');
var ReactAddons = require('react-addons');
var ResultActions = require('../actions/result-actions');

module.exports = React.createClass({
    mixins: [ReactAddons.LinkedStateMixin],

    getInitialState() {
        return {
            answer: ''
        };
    },

    handleClick() {
        ResultActions.fetchResults(this.props.exercise, this.state.answer);
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
