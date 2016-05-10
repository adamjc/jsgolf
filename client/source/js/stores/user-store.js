const alt = require('../alt')
const UserActions = require('../actions/user-actions')

class RegisterStore {
    constructor() {
        this.bindListeners({
            handleUpdateUser: RegisterActions.UPDATE_USER,
        })
    }

    handleUpdateUser(data) {
        this.data = data
    }
}

module.exports = alt.createStore(UserStore, 'UserStore')
