'use strict';

const alt = require('../alt');
const requestPromise = require('request-promise');
const url = location.origin + '/api/register';

class ExerciseActions {
    updateRegister(data) {
        this.dispatch(data);
    }

    register(userInfo) {
        console.log(userInfo);

        let requestOptions = {
            uri: url,
            method: 'POST',
            body: {
                username: userInfo.username,
                password: userInfo.password,
                email: userInfo.email
            },
            json: true
        };

        // we dispatch an event here so we can have a 'loading' event.
        this.dispatch();

        requestPromise(requestOptions)
            .then(results => this.actions.updateRegister('register success'))
            .catch(errorMessage => console.error(errorMessage));
    }
}

module.exports = alt.createActions(ExerciseActions);
