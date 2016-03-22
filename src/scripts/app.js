var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

import ListCreator from './components/ListCreator';
import ListDetail from './components/ListDetail';

var App = React.createClass({

    getInitialState : function() {
        return {
            lists : {},
            current_list : ''
        };
    },

    addList : function(list, timestamp) {
        this.state.lists['list_' + timestamp] = list;
        this.setState({lists : this.state.lists});
    },

    deleteList : function(input_id) {
        delete this.state.lists[input_id];
        this.setState({lists : this.state.lists});
    },

    selectList : function(input_id) {
        this.state.current_list = input_id;
        this.setState({current_list : this.state.current_list});
    },

    render : function() {
        return (
            <div>
                <ListCreator
                    onListCreated={this.addList}
                    onListDeleted={this.deleteList}
                    onListSelected={this.selectList}
                    lists={this.state.lists}
                    />
                <ListDetail
                    lists={this.state.lists}
                    current_list={this.state.current_list}/>
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
        <Route path="*" component={NotFound} />
    </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
