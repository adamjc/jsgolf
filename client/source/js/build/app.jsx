'use strict';

var React = require('react');

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');
var Router = require('./router.jsx');

var App = React.createClass({
    render() {
        return (
            <div>
                <Header />

                <Router />

                <Footer />
            </div>
        );
    }
});

$(document).ready(function () {
    React.render(<App />, document.body);
});
