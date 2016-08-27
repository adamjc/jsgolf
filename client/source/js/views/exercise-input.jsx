const React = require('react')
const brace = require('brace')
const AceEditor = require('react-ace')
const ResultActions = require('../actions/result-actions')
const ResultStore = require('../stores/result-store')
const ExerciseActions = require('../actions/exercise-actions')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

require('brace/mode/javascript')
require('brace/theme/monokai')

module.exports = React.createClass({
  getInitialState() {
    let storedAnswer = localStorage.getItem(`${this.props.exercise.title}`)

    return {
      answer: storedAnswer || 'function () {\n\t// Your code goes here...\n}'
    }
  },

  componentDidMount() {
    ResultStore.listen(this.onResult)
  },

  componentWillUnmount() {
    ResultStore.unlisten(this.onResult)
  },

  onChange(answer) {
    localStorage.setItem(`${this.props.exercise.title}`, answer)
    
    this.setState({
      answer: answer
    })
  },

  onResult() {
    this.setState({
      awaitingResults: false
    })
  },

  handleClick() {
    if (!this.state.answer) return

    ResultActions.fetchResults(this.props.exercise, this.state.answer)

    this.setState({
      awaitingResults: true
    })
  },

  render() {
    let awaitingResults

    if (this.state.awaitingResults) {
      awaitingResults =
        <div className="exercise-input__sent">
          <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
        </div>
    }

    return (
      <div className="exercise-input col-sm-6">
        <h3 className="exercise-input__header">
          Score: <span className="exercise-input__header-length">{this.state.answer.length}</span>
        </h3>

        <AceEditor
          className="exercise-input__editor"
          mode="javascript"
          theme="monokai"
          name="editor"
          height=""
          width=""
          onChange={this.onChange}
          value={this.state.answer}
        />

        <div className="exercise-input__button-wrapper">
          <button
            className="exercise-input__button btn btn-block"
            onClick={this.handleClick}>
            GO
          </button>

          <ReactCSSTransitionGroup
            transitionName="exericse-input-transition"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {awaitingResults}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
})
