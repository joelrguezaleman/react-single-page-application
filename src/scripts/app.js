var React = require('react');
var ReactDOM = require('react-dom');

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

var ListCreator = React.createClass({

    createList : function(event) {
        event.preventDefault();
        var list = {
            name : this.refs.name.value
        };
        this.props.addList(list);
    },

    render : function() {
        return (
            <form onSubmit={this.createList}>
                <input type="text" ref="name"/>
                <input type="submit" value="Create new list"/>
            </form>
        )
    }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
