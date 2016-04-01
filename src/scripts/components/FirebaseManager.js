(function () {
    'use strict';

    const FIREBASE_URL = 'https://list-manager-app.firebaseio.com/';
    const FIREBASE_REFERENCE = 'lists';

    var React = require('react');

    var Rebase = require('re-base');
    var base = Rebase.createClass(FIREBASE_URL);

    var FirebaseManager = React.createClass({
        load : function() {
            base.fetch(FIREBASE_REFERENCE, {
                context: this,
                then(data) {
                    this.props.updateLists(data.lists);
                    this.props.updateCurrentList(data.current_list);
                }
            });
        },

        save : function() {
            var current_list = this.props.current_list ?
                this.props.current_list : '';

            base.post(FIREBASE_REFERENCE, {
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