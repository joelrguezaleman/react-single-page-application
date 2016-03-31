(function () {
   'use strict';

    var React = require('react');

    var ListManager = React.createClass({

        createList : function(event) {
            event.preventDefault();

            var timestamp = (new Date()).getTime();
            var list = {
                name : this.refs.list_name.value,
                elements : []
            };

            this.props.lists['list_' + timestamp] = list;
            this.props.updateLists(this.props.lists);
        },

        deleteList : function(event) {
            var anchor = event.target.parentNode.childNodes[0];
            delete this.props.lists[anchor.id];

            var current_list = this.props.current_list;
            if (anchor.id === this.props.current_list) {
                current_list = '';
            }

            this.props.updateLists(this.props.lists);
            this.props.updateCurrentList(current_list);
        },

        setCurrentList : function(event) {
            this.props.updateCurrentList(event.target.id);
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
                        <input type="text" ref="list_name"/>
                        <input type="submit" ref="button" value="Create new list"/>
                    </form>
                    <ul>
                        {Object.keys(this.props.lists).map(this.renderList)}
                    </ul>
                </div>
            )
        }
    });

    module.exports = ListManager;
}());