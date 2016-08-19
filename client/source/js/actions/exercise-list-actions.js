const alt = require('../alt')
const requestPromise = require('request-promise')
const url = `${location.origin}/api/exercises`

class ExerciseListActions {
  updateExerciseList(data) {
    this.dispatch(data)
  }

  getExerciseList(data) {
    let requestOptions = {
      uri: url,
      method: 'GET'
    }

    // we dispatch an event here so we can have a 'loading' event.
    this.dispatch()

    requestPromise(requestOptions)
      .then((results) => {
        this.actions.updateExerciseList(JSON.parse(results))
      })
      .catch((errorMessage) => {
        console.log(errorMessage)
      })

    this.actions.updateExerciseList(data)
  }
}

module.exports = alt.createActions(ExerciseListActions)
