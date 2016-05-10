const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class UserStore {
    constructor () {
        this.bindListeners({
            handleUpdateUser: UserActions.UPDATE_USER,
        })
    }

    handleUpdateUser (data) {
        if (data.success) {
            localStorage.setItem('jwt', data.token)
        }
    }
}

module.exports = alt.createStore(UserStore, 'UserStore')
