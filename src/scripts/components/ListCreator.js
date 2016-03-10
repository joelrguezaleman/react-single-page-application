import ListRenderer from './ListRenderer';

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
                    <ListRenderer lists={this.state.lists} />
                </div>
            )
        }
    });

    module.exports = ListCreator;
}());