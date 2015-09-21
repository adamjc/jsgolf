'use strict';

var React = require('react');
var page = require('page');

var Exercise = require('./views/exercise.jsx');

module.exports = React.createClass({
    getInitialState() {
        return { component: <div /> }
    },

    render() {
        return this.state.component;
    },

    componentDidMount() {
        var self = this;

        page('/', (ctx) => {
            self.setState({
                component: <div>Home</div>
            });
        });

        page('/exercises', (ctx) => {
            self.setState({
                component: <div>Exercises</div>
            });
        });

        page('/exercises/:exercise', (ctx) => {
            console.log(ctx.params.exercise);

            self.setState({
                component: <Exercise exercise={ctx.params.exercise} />
            });
        });

        page('*', (ctx) => {
            self.setState({
                component: <div>404</div>
            });
        });

        page.start();
    }
});
