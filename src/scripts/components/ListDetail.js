(function () {
   'use strict';

    var React = require('react');

    var ListDetail = React.createClass({

        createElement : function(event) {
            event.preventDefault();

            this.props.onElementCreated(
                this.refs.element_name.value,
                'element_' + (new Date()).getTime()
            );
        },

        deleteElement : function(event) {
            var label = event.target.parentNode.childNodes[0];
            this.props.onElementDeleted(label.id);
        },

        renderElement : function(key) {
            return (
                <li key={key}>
                    <label id={key}>{this.props.lists[this.props.current_list].elements[key]}</label>
                    <i className="fa fa-trash" onClick={this.deleteElement}></i>
                </li>
            )
        },

        render : function() {
            var current_list = this.props.lists[this.props.current_list];
            if (current_list) {
                return (
                    <div>
                        <p>{current_list.name}</p>
                        <form onSubmit={this.createElement}>
                            <input type="text" ref="element_name"/>
                            <input type="submit" ref="button" value="Create new element"/>
                        </form>
                        <ul>
                            {Object.keys(current_list.elements).map(this.renderElement)}
                        </ul>
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }
        }
    });

    module.exports = ListDetail;
}());