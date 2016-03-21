(function () {
   'use strict';

    var React = require('react');

    var ListDetail = React.createClass({

        updateList : function(event) {
            if (event.keyCode === 13) {
                this.props.onListUpdated(event);
            }
        },

        render : function() {
            if (this.props.lists[this.props.current_list]) {
                return (
                    <div>
                        <input type="text" value={this.props.lists[this.props.current_list].name} onChange={this.updateList} />
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