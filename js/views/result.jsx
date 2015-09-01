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

    handleClick() {
        ResultActions.fetchResults();
    },

    render() {
        if (this.state.errorMessage) {
            return (
                <div>Something bad happened.</div>
            );
        }

        if (!this.state.results.length) {
            return (
                <div>
                    loading-spinner.gif
                    <button onClick={this.handleClick}></button>
                </div>
            );
        }

        return (
            <ul>
                {this.state.results.map((result) => {
                    return (
                        <li key={result.id}>{result.text}</li>
                    );
                })}
            </ul>
        );
    }
});
