'use strict';

const React = require('react');
const page = require('page');
const Exercise = require('./views/exercise.jsx');
const ExerciseList = require('./views/exercise-list.jsx');
const Register = require('./views/register.jsx');

module.exports = React.createClass({
    getInitialState() {
        return { component: <div /> };
    },

    render() {
        return this.state.component;
    },

    componentDidMount() {
        page('/', (ctx) => {
            this.setState({
                component: <div>Home</div>
            });
        });

        page('/exercises', (ctx) => {
            this.setState({
                component: <ExerciseList></ExerciseList>
            });
        });

        page('/exercises/:exercise', (ctx) => {
            this.setState({
                component: <Exercise exerciseNumber={ctx.params.exercise} />
            });
        });

        page('/sign-in', (ctx) => {
            this.setState({
                component: <div>Sign In Placeholder</div>
            });
        });

        page('/register', (ctx) => {
            this.setState({
                component: <Register></Register>
            });
        });

        page('*', (ctx) => {
            this.setState({
                component: <div>404</div>
            });
        });

        page.start();
    }
});
