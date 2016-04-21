'use strict';

const React = require('react');
const RegisterActions = require('../actions/register-actions')
const RegisterStore = require('../stores/register-store')
const LinkedStateMixin = require('react-addons-linked-state-mixin');

module.exports = React.createClass({
    mixins: [LinkedStateMixin],

    getInitialState () {
        return {
            passwordVisibile: false
        };
    },

    componentDidMount () {
        RegisterStore.listen(this.onChange);
    },

    componentWillUnmount () {

    },

    onChange (data) {
        console.log(data);
    },

    handleUserNameChange (event) {
        this.setState({username: event.target.value});
        RegisterActions.getUser(this.state.username);
    },

    handleRegisterClick () {
        RegisterActions.register({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        });
    },

    handlePasswordClick () {
        this.setState({
            passwordVisibile: !this.state.passwordVisibile
        });
    },

    render () {
        let passwordVisibile = this.state.passwordVisibile ? 'text' : 'password';
        let passwordVisibleText = this.state.passwordVisibile ? 'HIDE' : 'SHOW';

        return (
            <div className="col-sm-12 register">
                <div className="center-block register__inner">
                    <h2 className="text-center register__title">Enter Your Details</h2>
                    <div className="register__inputs center-block">
                        <input type="text" value={this.state.value} onChange={this.handleUserNameChange} className="register__input register__input--username center-block" placeholder="username"></input>
                        <div className="register__password-wrapper center-block">
                            <input type={passwordVisibile} valueLink={this.linkState('password')} className="register__input register__input--password" placeholder="password"></input>
                            <div onClick={this.handlePasswordClick} className="register__password-visibility">{passwordVisibleText}</div>
                        </div>
                        <input type="text" valueLink={this.linkState('email')} className="register__input register__input--email center-block" placeholder="email (optional)"></input>
                    </div>
                    <button
                        className="register__button btn btn-block center-block"
                        onClick={this.handleRegisterClick}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
})
