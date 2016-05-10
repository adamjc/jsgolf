'use strict'

const React = require('react')
const UserStore = require('../stores/user-store')
const UserActions = require('../actions/user-actions')

module.exports = React.createClass({
    getInitialState () {
        return {}
    },

    componentDidMount () {
    },

    componentWillUnmount () {
    },

    onChange (data) {
        this.setState(data)
    },

    handleUsernameChange (event) {
        this.setState({username: event.target.value})
    },

    handlePasswordChange (event) {
        this.setState({password: event.target.value})
    },

    handlePasswordClick () {
        this.setState({passwordVisibile: !this.state.passwordVisibile})
    },

    handleSignInClick () {
        UserActions.signIn({
            username: this.state.username,
            password: this.state.password
        })
    },

    render () {
        let passwordVisibile = this.state.passwordVisibile ? 'text' : 'password'
        let passwordVisibleText = this.state.passwordVisibile ? 'HIDE' : 'SHOW'

        return (
            <div className="col-sm-12 register">
                <div className="center-block register__inner">
                    <h2 className="text-center register__title">Enter Your Details</h2>

                    <div className="register__inputs center-block">
                        <input type="text" value={this.state.value} onChange={this.handleUsernameChange} className="register__input register__input--username center-block" placeholder="username"></input>

                        <div className="register__password-wrapper center-block">
                            <input type={passwordVisibile} onChange={this.handlePasswordChange} className="register__input register__input--password" placeholder="password"></input>

                            <div onClick={this.handlePasswordClick} className="register__password-visibility">{passwordVisibleText}</div>
                        </div>
                    </div>

                    <button className="register__button btn btn-block center-block"
                            onClick={this.handleSignInClick}>
                        Sign In
                    </button>
                </div>
            </div>
        )
    }
})
