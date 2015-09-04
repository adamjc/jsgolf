var ReactAddons = require('react-addons');
var ResultActions = require('../actions/result-actions');

module.exports = React.createClass({
    mixins: [ReactAddons.LinkedStateMixin],

    getInitialState() {
        return {
            inputValue: ''
        };
    },

    handleClick() {
        console.log('handle click triggered');
        //ResultActions.fetchResults(window.location.hash, 'yo');
    },

    render() {
        console.log(this.state);

        return (
            <div>
                <textarea valueLink={this.linkState('inputValue')} />
                <button onClick={this.handleClick}>Submit!</button>
            </div>
        )
    }
});
