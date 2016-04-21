const alt = require('../alt');
const RegisterActions = require('../actions/register-actions');

class RegisterStore {
    constructor() {
        this.bindListeners({
            handleUpdateRegister: RegisterActions.UPDATE_REGISTER,
            handleGotUser: RegisterActions.GOT_USER
        })
    }

    handleGotUser(data) {
        console.log(data);
        this.userExists = false;
    }

    handleUpdateRegister(data) {
        this.data = data;
    }
}

module.exports = alt.createStore(RegisterStore, 'RegisterStore');
