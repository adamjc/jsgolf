const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class UserStore {
  constructor () {
    this.jwt = null

    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleSignOut: UserActions.SIGN_OUT,
      handleAwaitingResults: UserActions.AWAITING_RESULTS
    })
  }

  handleUpdateUser (data) {
    if (data.success) {
      this.jwt = data.token
      localStorage.setItem('jwt', data.token)
    }
  }

  handleSignOut () {
    this.jwt = null
    localStorage.removeItem('jwt')
  }

  handleAwaitingResults (signInInfo) {
    this.signInInfo = signInInfo;
  }
}

module.exports = alt.createStore(UserStore, 'UserStore')
