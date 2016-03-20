var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

import ListCreator from './components/ListCreator';

var App = React.createClass({

    render : function() {
        return (
            <div>
                <ListCreator />
            </div>
        );
    }
});

var NotFound = React.createClass({
    render : function() {
        return (
            <h1>Page not found</h1>
        );
    }
});

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App} />
        <Route path="/list/:list_id" component={App} />
        <Route path="*" component={NotFound} />
    </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
