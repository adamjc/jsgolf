const React = require('react')
const ExerciseListStore = require('../stores/exercise-list-store')
const ExerciseListActions = require('../actions/exercise-list-actions')
const page = require('page')

module.exports = React.createClass({
  getInitialState() {
    return {
      exerciseList: ''
    }
  },

  componentDidMount() {
    ExerciseListStore.listen(this.onChange)
    ExerciseListActions.getExerciseList()
  },

  componentWillUnmount() {
    ExerciseListStore.unlisten(this.onChange)
    },

  onChange(state) {
    this.setState(state)
  },

  render() {
    let exercises
    console.log('exercises', this.state.exerciseList)
    if (this.state.exerciseList) {
      exercises = this.state.exerciseList.map(exercise => {
        return (
          <li key={exercise.id}>
            <a href={exercise.url}>{exercise.title}</a>
            { exercise.completed ? <span className="exercise-list__completed glyphicon glyphicon-ok" /> : null }
          </li>
        )
      })
    }

    return(
      <div className="exercise-list col-sm-12">
        <ul className="exercise-list__list">
          {exercises}
        </ul>
      </div>
    )
  }
})
