jest.dontMock('../src/scripts/components/ListManager');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListManager = require('../src/scripts/components/ListManager');

describe('ListManager', function() {

    var list_manager;
    var event;

    beforeEach(function() {
        list_manager = TestUtils.renderIntoDocument(<ListManager/>);

        event = {
            keyCode : 13,
            target : {
                disabled : true,
                id : 'list_1',
                value : 'Another name',
                parentNode : {
                    childNodes : [{
                        id : 'list_1'
                    }]
                }
            }
        };
    });

    it('adds a new list', function() {
        list_manager.refs.list_name.value = 'My new list';
        
        var button = list_manager.refs.button;
        TestUtils.Simulate.click(button);

        var lists = TestUtils.scryRenderedDOMComponentsWithClass(
            list_manager, 'list'
        );

        setImmediate(function() {
            expect(lists.length).toEqual(1);
        });
    });

    it('deletes the list', function() {
        list_manager.state.lists.list_1 = {
            name : 'List 1'
        };
        list_manager.state.lists.list_2 = {
            name : 'List 2'
        };

        list_manager.deleteList(event);

        expect(list_manager.state.lists).toEqual({
            list_2: {
                name: 'List 2'
            }
        });
    });
});