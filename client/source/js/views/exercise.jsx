'use strict'

const React = require('react')
const ExerciseInput = require('./exercise-input.jsx')
const Result = require('./result.jsx')
const ExerciseStore = require('../stores/exercise-store')
const ExerciseActions = require('../actions/exercise-actions')

module.exports = React.createClass({
    getInitialState() {
        return {}
    },

    componentDidMount() {
        ExerciseStore.listen(this.onChange)
        ExerciseActions.getExercise(this.props.exercise)
    },

    componentWillUnmount() {
        ExerciseStore.unlisten(this.onChange)
    },

    onChange(state) {
        this.setState(state)
    },

    render() {
        let result = <Result />

        if (this.state.exercise) {
            return(
                <div>
                    <div className="col-sm-12">
                        <h2>{this.state.exercise.title}</h2>
                        <p>{this.state.exercise.description}</p>
                    </div>

                    <ExerciseInput exercise={this.state.exercise}/>

                    {result}
                </div>
            )
        } else {
            return(<div>Waiting...</div>)
        }
    }
})
