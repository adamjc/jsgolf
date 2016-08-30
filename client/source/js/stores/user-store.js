const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class UserStore {
  constructor () {
    this.jwt = null
    this.completedExercises = null

    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleSignOut: UserActions.SIGN_OUT,
      handleAwaitingResults: UserActions.AWAITING_RESULTS,
      handleAddCompletedExercise: UserActions.ADD_COMPLETED_EXERCISE
    })
  }

  handleAddCompletedExercise (exercise) {
    let completedExercises = localStorage.getItem('exercises') || []

    completedExercises.push(exercise)
    localStorage.setItem('exercises', completedExercises)
  }

  handleUpdateUser (data) {
    debugger

    if (data.success) {
      this.jwt = data.token
      localStorage.setItem('jwt', data.token)
      localStorage.setItem('username', data.username)
      localStorage.setItem('exercises', data.exercises)
    }
  }

  handleSignOut () {
    this.jwt = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
  }

  handleAwaitingResults (signInInfo) {
    this.signInInfo = signInInfo
  }
}

module.exports = alt.createStore(UserStore, 'UserStore')
