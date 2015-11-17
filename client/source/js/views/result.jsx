const React = require('react');
const ResultStore = require('../stores/result-store');
const ResultActions = require('../actions/result-actions');
const _ = require('lodash');
const stringifyObject = require('stringify-object');

module.exports = React.createClass({
    getInitialState() {
        return ResultStore.getState();
    },

    componentDidMount() {
        ResultStore.listen(this.onChange);
    },

    componentWillUnmount() {
        ResultStore.unlisten(this.onChange);
        ResultActions.updateResults(null);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        let resultsList;
        let resultsListItems;

        if (this.state.results) {
            resultsListItems = this.state.results.map(result => {
                let icon;
                let resultInput = stringifyObject(result.input);
                let resultOutput = stringifyObject(result.output);

                if (result.correct) {
                    icon = <span className="glyphicon result-correct glyphicon-ok-circle" aria-hidden="true"></span>
                } else {
                    icon = <span className="glyphicon result-incorrect glyphicon-remove-circle" aria-hidden="true"></span>
                }

                return (
                    <li key={result.id} className="col-sm-12 result__list-item">
                        <div className="result-text col-sm-6">
                            <div>
                                <span className="result-text__descriptor">IN: </span>
                                {resultInput}
                            </div>
                            <div>
                                <span className="result-text__descriptor">OUT: </span>
                                {resultOutput}
                            </div>
                        </div>
                        <div className="glyph-wrapper col-sm-6">
                            {icon}
                        </div>
                    </li>
                );
            });

            resultsList = <ul className="result__list">{resultsListItems}</ul>
        }

        return (
            <div className="col-sm-6">
                <div className="result">
                    <h3 className="result__header">Results</h3>

                    {resultsList}
                </div>
            </div>
        );
    }
});
