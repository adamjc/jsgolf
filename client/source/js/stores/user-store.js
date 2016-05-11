const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class UserStore {
    constructor () {
        this.jwt = null

        this.bindListeners({
            handleUpdateUser: UserActions.UPDATE_USER,
            handleSignOut: UserActions.SIGN_OUT
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
}

module.exports = alt.createStore(UserStore, 'UserStore')
