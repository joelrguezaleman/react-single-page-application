jest.dontMock('../src/scripts/components/ListCreator');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListCreator = require('../src/scripts/components/ListCreator');

describe('ListCreator', function() {

    var listCreator;
    var event;

    beforeEach(function() {
        listCreator = TestUtils.renderIntoDocument(<ListCreator/>);

        event = {
            keyCode : 13,
            target : {
                disabled : true,
                id : 'list_1',
                value : 'Another name'
            }
        };
    });

    it('adds a new list', function() {
        listCreator.refs.name.value = 'My new list';
        
        var button = listCreator.refs.button;
        TestUtils.Simulate.click(button);

        var lists = TestUtils.scryRenderedDOMComponentsWithClass(
            listCreator, 'list'
        );

        setImmediate(function() {
            expect(lists.length).toEqual(1);
        });
    });

    it('enables the list to be edited', function() {
        listCreator.toggleListEdition(event);

        expect(event.target.disabled).toEqual(false);
    });

    it('updates the list', function() {
        listCreator.state.lists.list_1 = {
            name : 'List 1'
        };

        listCreator.updateList(event);

        expect(listCreator.state.lists.list_1.name).toEqual(
            'Another name'
        );
    });

    it('disables the list input text after updating it', function() {
        listCreator.state.lists.list_1 = {
            name : 'List 1'
        };
        event.target.disabled = false;

        listCreator.updateList(event);

        expect(event.target.disabled).toEqual(true);
    });
});