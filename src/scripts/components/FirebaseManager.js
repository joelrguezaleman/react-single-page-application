(function () {
    'use strict';

    var React = require('react');

    var Rebase = require('re-base');
    var base = Rebase.createClass(
        'https://list-manager-app.firebaseio.com/'
    );

    var FirebaseManager = React.createClass({
        load : function() {
            base.fetch('lists', {
                context: this,
                then(data) {
                    this.props.updateLists(data.lists);
                    this.props.updateCurrentList(data.current_list);
                }
            });
        },

        save : function() {
            base.post('lists', {
                data: {
                    lists : this.props.lists,
                    current_list : this.props.current_list
                }
            });
        },

        render : function() {
            return (
                <div>
                    <button onClick={this.load}>
                        Load from Firebase
                    </button>
                    <button onClick={this.save}>
                        Save to Firebase
                    </button>
                </div>
            );
        }
    });

    module.exports = FirebaseManager;
}());