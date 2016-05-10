'use strict'

const React = require('react')
const page = require('page')

function navigate (url) {
    return () => {
        page(url)
    }
}

module.exports = React.createClass({
    render() {
        let userSignedIn = localStorage.getItem('jwt')
        let accountControls

        if (userSignedIn === null) {
            accountControls =
                <ul className="nav navbar-nav">
                    <li><a onClick={navigate('/exercises')}>Exercises</a></li>
                    <li><a onClick={navigate('/sign-in')}>Sign In</a></li>
                    <li><a onClick={navigate('/register')}>Register</a></li>
                </ul>
        } else {
            accountControls =
                <ul className="nav navbar-nav">
                    <li><a onClick={navigate('/exercises')}>Exercises</a></li>
                    <li><a onClick={navigate('/sign-out')}>Sign Out</a></li>
                </ul>
        }

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <li>
                            <a className="navbar-brand" onClick={navigate('/')}>JSGolf</a>
                        </li>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        {accountControls}
                    </div>
                </div>
            </nav>
        )
    }
})
