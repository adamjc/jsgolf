'use strict';

const React = require('react');

module.exports = React.createClass({
    getInitialState() {
        return {
            passwordVisibile: false
        };
    },

    componentDidMount() {

    },

    componentWillUnmount() {

    },

    onChange(state) {
        this.setState(state);
    },

    handleRegisterClick() {
        console.log('Register Clicked');
    },

    handlePasswordClick() {
        this.setState({
            passwordVisibile: !this.state.passwordVisibile
        });
    },

    render() {
        let passwordVisibile = this.state.passwordVisibile ? 'text' : 'password';

        return (
            <div className="col-sm-12 register">
                <div className="center-block register__inner">
                    <h2 className="text-center register__title">Enter Your Details</h2>
                    <div className="register__inputs center-block">
                        <input type="text" className="register__input register__input--username center-block" placeholder="username"></input>
                        <div className="register__password-wrapper center-block">
                            <input type={passwordVisibile} className="register__input register__input--password" placeholder="password"></input>
                            <div onClick={this.handlePasswordClick} className="register__password-visibility">SHOW</div>
                        </div>
                        <input type="text" className="register__input register__input--email center-block" placeholder="email (optional)"></input>
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
