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
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <li>
                            <a className="navbar-brand" onClick={navigate('/')}>JSGolf</a>
                        </li>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><a onClick={navigate('/')}>Home</a></li>
                            <li><a onClick={navigate('/exercises')}>Exercises</a></li>
                            <li><a onClick={navigate('/something')}>Something</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});
