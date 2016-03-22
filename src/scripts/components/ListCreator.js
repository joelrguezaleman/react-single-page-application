(function () {
   'use strict';

    var React = require('react');

    var ListCreator = React.createClass({

        createList : function(event) {
            event.preventDefault();

            var timestamp = (new Date()).getTime();
            var list = {
                name : this.refs.name.value,
                elements : []
            };

            this.props.onListCreated(list, timestamp);
        },

        deleteList : function(event) {
            var input = event.target.parentNode.childNodes[0];
            this.props.onListDeleted(input.id);
        },

        setCurrentList : function(event) {
            var input = event.target.parentNode.childNodes[0];
            this.props.onListSelected(input.id);
        },

        renderList : function(key) {
            return (
                <li className="list" key={key}>
                    <a href="#" id={key} onClick={this.setCurrentList}>{this.props.lists[key].name}</a>
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
                        {Object.keys(this.props.lists).map(this.renderList)}
                    </ul>
                </div>
            )
        }
    });

    module.exports = ListCreator;
}());