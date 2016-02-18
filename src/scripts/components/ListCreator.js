import React from 'react';

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

export default ListCreator;