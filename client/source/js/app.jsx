'use strict';

const React = require('react');
const Header = require('./header.jsx');
const Footer = require('./footer.jsx');
const Router = require('./router.jsx');

var App = React.createClass({
    render() {
        return (
            <div>
                <Header />

                <div className="main-container container">
                    <Router />
                </div>

                <Footer />
            </div>
        );
    }
});

$(document).ready(function () {
    React.render(<App />, document.body);
});
