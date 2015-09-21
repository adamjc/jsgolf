'use strict';

var React = require('react');
var page = require('page');

function navigate(url) {
    return () => {
        page(url);
    };
}

module.exports = React.createClass({
    render() {
        return (
            <ul>
                <li><a onClick={navigate('/')}>Home</a></li>
                <li><a onClick={navigate('/exercises')}>Exercises</a></li>
                <li><a onClick={navigate('/something')}>Something</a></li>
            </ul>
        );
    }
});
