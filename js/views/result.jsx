var ResultStore = require('../stores/result-store');

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
    }

    render() {
        return (
            <ul>
                {this.state.results.map((result) => {
                    return (
                        <li>{result.name}</li>
                    );
                })};
            </ul>
        );
    }
});
