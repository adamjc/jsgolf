const React = require('react')
const Header = require('./header.jsx')
const Router = require('./router.jsx')
const ReactDOM = require('react-dom')

var App = React.createClass({
    render() {
        return (
            <div>
                <Header />

                <div className="main-container container">
                    <Router />
                </div>
            </div>
        )
    }
})

$(document).ready(function () {
    ReactDOM.render(<App />, document.getElementById('app'))
})
