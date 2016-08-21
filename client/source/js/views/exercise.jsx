const React = require('react')
const ExerciseInput = require('./exercise-input.jsx')
const ExerciseTable = require('./exercise-table.jsx')
const Result = require('./result.jsx')
const ExerciseStore = require('../stores/exercise-store')
const ExerciseActions = require('../actions/exercise-actions')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

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
    let table

    let waiting =
      <ReactCSSTransitionGroup
        transitionName="button-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        <div className="waiting-spinner">
          <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
        </div>
      </ReactCSSTransitionGroup>

    if (this.state.exercise) {
      if (this.state.exercise.tableData) {
        table = <ExerciseTable scores={this.state.exercise.tableData.scores}/>
      } else {
        table = <div></div>
      }

      return(
        <div>
            <div className="col-sm-12">
              <h2>{this.state.exercise.title}</h2>
              <p>{this.state.exercise.description}</p>
            </div>

            <ExerciseInput exercise={this.state.exercise}/>

            {result}

            {table}
        </div>
      )
    } else {
      return(waiting)
    }
  }
})
