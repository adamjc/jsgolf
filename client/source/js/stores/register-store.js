const alt = require('../alt');
const RegisterActions = require('../actions/register-actions');

class RegisterStore {
    constructor() {
        this.bindListeners({
            handleUpdateRegister: RegisterActions.UPDATE_REGISTER,
            handleUserAvailable: RegisterActions.USER_AVAILABLE
        })
    }

    handleUserAvailable(isUsernameAvailable) {
        this.isUsernameAvailable = isUsernameAvailable;
    }

    handleUpdateRegister(data) {
        this.data = data;
    }
}

module.exports = alt.createStore(RegisterStore, 'RegisterStore');
