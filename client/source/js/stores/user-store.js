const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class RegisterStore {
    constructor () {
        this.bindListeners({
            handleUpdateUser: RegisterActions.UPDATE_USER,
        })
    }

    handleUpdateUser (data) {
        if (data.success) {
            localStorage.setItem("jwt", data.token)
        }
    }
}

module.exports = alt.createStore(UserStore, 'UserStore')
