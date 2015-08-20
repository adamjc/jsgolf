var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

var Test = React.createClass({
    render: function () {
        return (
            <div>
                This is a test.
            </div>
        );
    }
});

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <ul>
                    <li><Link to="test">Dashboard</Link></li>
                    <li><Link to="app">Home</Link></li>
                </ul>
                Hello World! I am main.js.
                <Footer />

                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route name='app' path='/' handler={App}>
        <Route name='test' handler={Test} />
        <DefaultRoute handler={Test} />
    </Route>
);

$(document).ready(function () {
    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.body);
    });
});
