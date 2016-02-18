var React = require('react');
var ReactDOM = require('react-dom');

import ListCreator from './components/ListCreator';

var App = React.createClass({

    getInitialState : function() {
        return {
            lists : {}
        };
    },

    addList : function(list) {
        var timestamp = (new Date()).getTime();
        this.state.lists['list-' + timestamp] = list;
        this.setState({
            lists : this.state.lists
        });
    },

    renderList : function(key) {
        return (
            <li key={key}>
                {this.state.lists[key].name}
            </li>
        )
    },

    render : function() {
        return (
            <div>
                <div>
                    <ListCreator addList={this.addList} />
                    <ul>
                        {Object.keys(this.state.lists).map(this.renderList)}
                    </ul>
                </div>
                <div>

                </div>
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
