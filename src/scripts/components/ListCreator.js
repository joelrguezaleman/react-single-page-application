(function () {
   'use strict';

    var React = require('react');

    var ListCreator = React.createClass({

        getInitialState : function() {
            return {
                lists : {}
            };
        },

        createList : function(event) {
            event.preventDefault();

            var timestamp = (new Date()).getTime();
            var list = {name : this.refs.name.value};

            this.state.lists['list_' + timestamp] = list;
            this.setState({lists : this.state.lists});
        },

        updateList : function(event) {
            if (event.keyCode === 13) {
                this.state.lists[event.target.id].name =
                    event.target.value;
                this.setState(this.state.lists);

                event.target.disabled = true;
            }
        },

        deleteList : function(event) {
            var input = event.target.parentNode.childNodes[0];
            delete this.state.lists[input.id];
            this.setState({lists : this.state.lists});
        },

        renderList : function(key) {
            return (
                <li className="list" key={key}>
                    <a href={"/list/" + key} id={key}>{this.state.lists[key].name}</a>
                    <i className="fa fa-trash" onClick={this.deleteList}></i>
                </li>
            )
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