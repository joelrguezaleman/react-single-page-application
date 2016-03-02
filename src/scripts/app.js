var React = require('react');
var ReactDOM = require('react-dom');

import ListCreator from './components/ListCreator';

var App = React.createClass({

    render : function() {
        return (
            <div>
                <ListCreator />
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.querySelector('#main'));
