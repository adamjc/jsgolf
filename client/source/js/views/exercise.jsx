const React = require('react')
const ExerciseInput = require('./exercise-input.jsx')
const ExerciseTable = require('./exercise-table.jsx')
const Result = require('./result.jsx')
const ExerciseStore = require('../stores/exercise-store')
const ExerciseActions = require('../actions/exercise-actions')
const ResultActions = require('../actions/result-actions')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
const page = require('page')

function navigate (url) {
  return _ => page(url)
}

module.exports = React.createClass({
  getInitialState () {
    return {}
  },

  componentDidMount () {
    ExerciseStore.listen(this.onChange)
    ExerciseActions.getExercise(this.props.exercise)
  },

  componentWillUnmount () {
    ExerciseStore.unlisten(this.onChange)
  },

  componentWillReceiveProps (newProps) {
    ExerciseActions.getExercise(newProps.exercise)
    ResultActions.clearResults();
  },

  onChange (state) {
    this.setState(state)
  },

  handleNextExercise () {
    page(this.state.exercise.nextExerciseUrl)
  },

  render () {
    let result = <Result />
    let table
    let notSignedInText
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

    if (!localStorage.getItem('username')) {
      notSignedInText =
        <div className="not-signed-in-text text-center col-xs-12">
          Hey! Just to let you know that your score won't be submitted as you're not signed in. <a onClick={navigate('/register')}>Click here to register</a>
        </div>
    } else notSignedInText = <div></div>

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

            <div className="col-sm-6">
              <ExerciseInput exercise={this.state.exercise}/>

              <button className="btn btn--green exercise__button" onClick={this.handleNextExercise}>Next Exercise</button>
            </div>


            {result}
            {notSignedInText}
            {table}


        </div>
      )
    } else {
      return(waiting)
    }
  }
})
