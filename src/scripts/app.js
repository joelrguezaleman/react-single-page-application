import ElementManager from './components/ElementManager';
import FirebaseManager from './components/FirebaseManager';
import ListManager from './components/ListManager';
import NotFound from './components/NotFound';

(function () {
   'use strict';

    var React = require('react');
    var ReactDOM = require('react-dom');

    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var Navigation = ReactRouter.Navigation;
    var createBrowserHistory = require('history/lib/createBrowserHistory');

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

        updateLists : function(lists) {
            this.setState({
                lists : lists
            });
        },

        updateCurrentList : function(current_list) {
            this.setState({
                current_list : current_list
            });
        },

        render : function() {
            return (
                <div>
                    <ListManager
                        updateLists={this.updateLists}
                        updateCurrentList={this.updateCurrentList}
                        lists={this.state.lists}
                        />
                    <ElementManager
                        updateLists={this.updateLists}
                        updateCurrentList={this.updateCurrentList}
                        lists={this.state.lists}
                        current_list={this.state.current_list}
                        />
                    <FirebaseManager
                        updateLists={this.updateLists}
                        updateCurrentList={this.updateCurrentList}
                        lists={this.state.lists}
                        current_list={this.state.current_list}
                        />
                </div>
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
}());