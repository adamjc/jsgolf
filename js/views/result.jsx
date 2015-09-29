var React = require('react');
var ResultStore = require('../stores/result-store');
var ResultActions = require('../actions/result-actions');


module.exports = React.createClass({
    getInitialState() {
        return ResultStore.getState();
    },

    componentDidMount() {
        ResultStore.listen(this.onChange);
    },

    componentWillUnmount() {
        ResultStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        if (this.state.errorMessage) {
            return (
                <div>Something bad happened.</div>
            );
        }

        if (!this.state.results) {
            return (
                <div>
                    loading-spinner.gif
                </div>
            );
        }

        return (
            <ul>
                {this.state.results.map((result) => {
                    return (
                        <li key={result.id}>
                            <div>{result.correct}</div>
                            <div>{result.input}</div>
                            <div>{result.output}</div>
                        </li>
                    );
                })}
            </ul>
        );
    }
});
