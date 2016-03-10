(function () {
   'use strict';

    var React = require('react');

    var ListRenderer = React.createClass({

        renderList : function(key) {
            return (
                <li className="list" key={key}>
                    {this.props.lists[key].name}
                    <i className="fa fa-pencil"></i>
                    <i className="fa fa-trash"></i>
                </li>
            )
        },

        render : function() {
            return (
                <ul>
                    {Object.keys(this.props.lists).map(this.renderList)}
                </ul>
            )
        }
    });

    module.exports = ListRenderer;
}());