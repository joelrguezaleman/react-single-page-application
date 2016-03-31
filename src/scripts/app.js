var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Rebase = require('re-base');
var base = Rebase.createClass(
    'https://list-manager-app.firebaseio.com/'
);

import ListManager from './components/ListManager';
import ElementManager from './components/ElementManager';

var App = React.createClass({

    getInitialState : function() {
        return {
            lists : {},
            current_list : ''
        };
    },

    componentDidMount : function() {
        var lists_ref = localStorage.getItem('lists');
        var current_list_ref = localStorage.getItem('current_list');
        if (lists_ref && current_list_ref) {
            this.setState({
                lists : JSON.parse(lists_ref),
                current_list : current_list_ref
            });
        }
    },

    componentWillUpdate : function(next_props, next_state) {
        localStorage.setItem('lists', JSON.stringify(next_state.lists));
        localStorage.setItem('current_list', next_state.current_list);
    },

    addList : function(list, timestamp) {
        this.state.lists['list_' + timestamp] = list;
        this.setState({lists : this.state.lists});
    },

    deleteList : function(list_id) {
        delete this.state.lists[list_id];
        this.setState({lists : this.state.lists});

        if (list_id === this.state.current_list) {
            this.selectList('');
        }
    },

    selectList : function(list_id) {
        this.state.current_list = list_id;
        this.setState({current_list : this.state.current_list});
    },

    createElement : function(value, key) {
        this.state.lists[this.state.current_list].elements.splice(key, 0, value);
        this.setState({lists : this.state.lists});
    },

    deleteElement : function(element_id) {
        this.state.lists[this.state.current_list].elements.splice([element_id], 1);
        this.setState({lists : this.state.lists});
    },

    saveToFirebase : function() {
        base.post('lists', {
            data: {
                lists : this.state.lists,
                current_list : this.state.current_list
            }
        });
    },

    render : function() {
        return (
            <div>
                <ListManager
                    onListCreated={this.addList}
                    onListDeleted={this.deleteList}
                    onListSelected={this.selectList}
                    lists={this.state.lists}
                    />
                <ElementManager
                    onElementCreated={this.createElement}
                    onElementDeleted={this.deleteElement}
                    lists={this.state.lists}
                    current_list={this.state.current_list}/>
                <button onClick={this.saveToFirebase}>Save to Firebase</button>
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
