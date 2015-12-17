'use strict';

const React = require('react');

module.exports = React.createClass({
    getInitialState() {
        return {};
    },

    componentDidMount() {

    },

    componentWillUnmount() {

    },

    onChange(state) {
        this.setState(state);
    },

    handleClick() {
        console.log('Register Clicked');
    },

    render() {
        return (
            <div className="col-sm-6 register">
                <div className="center-block">
                    <h2 className="text-center register__header">Enter Your Details</h2>
                    <div className="register__inputs">
                        <input type="text" className="register__input--username" placeholder="username"></input>
                        <input type="text" className="register__input--password" placeholder="password"></input>
                        <input type="text" className="register__input--email"placeholder="email (optional)"></input>
                    </div>
                    <button
                        className="register__button btn btn-block"
                        onClick={this.handleClick}>
                        Register
                    </button>
                </div>
            </div>
        );
    }
})
