(function () {
   'use strict';

    var React = require('react');

    var ListCreator = React.createClass({

        getInitialState : function() {
            return {
                lists : {}
            };
        },

        renderList : function(key) {
            return (
                <li className="list" key={key}>
                    {this.state.lists[key].name}
                </li>
            )
        },

        createList : function(event) {
            event.preventDefault();

            var timestamp = (new Date()).getTime();
            var list = {name : this.refs.name.value};

            this.state.lists['list-' + timestamp] = list;
            this.setState({lists : this.state.lists});
        },

        render : function() {
            return (
                <div>
                    <form onSubmit={this.createList}>
                        <input type="text" ref="name"/>
                        <input type="submit" ref="button" value="Create new list"/>
                    </form>
                    <ul>
                        {Object.keys(this.state.lists).map(this.renderList)}
                    </ul>
                </div>
            )
        }
    });

    module.exports = ListCreator;
}());