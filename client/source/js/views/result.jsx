const React = require('react');
const ResultStore = require('../stores/result-store');
const ResultActions = require('../actions/result-actions');

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
                <div className="col-sm-6">Something bad happened.</div>
            );
        }

        if (!this.state.results) {
            return (
                <div className="col-sm-6">
                    loading-spinner.gif
                </div>
            );
        }

        return (
            <div className="col-sm-6">
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
            </div>
        );
    }
});
