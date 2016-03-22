(function () {
   'use strict';

    var React = require('react');

    var ListDetail = React.createClass({

        renderElements : function() {
            var html = '';

            var list = this.props.lists[this.props.current_list];
            if (list.elements.length > 0) {
                html += '<ul>';
                for (var i=0; i<list.elements.length; i++) {
                    html = html + '<li>' + list.elements[i] + '</li>';
                }
                html += '</ul>';
            }

            return html;
        },

        render : function() {
            if (this.props.lists[this.props.current_list]) {
                return (
                    <div>
                        <p>{this.props.lists[this.props.current_list].name}</p>
                        {this.renderElements}
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