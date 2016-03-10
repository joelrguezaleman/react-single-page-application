jest.dontMock('../src/scripts/components/ListCreator');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListCreator = require('../src/scripts/components/ListCreator');

describe('ListCreator', function() {
    it('should add a new list', function() {
        var listCreator = TestUtils.renderIntoDocument(<ListCreator/>);
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
});