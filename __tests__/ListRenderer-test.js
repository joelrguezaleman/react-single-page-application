jest.dontMock('../src/scripts/components/ListRenderer');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListRenderer = require('../src/scripts/components/ListRenderer');

describe('ListRenderer', function() {
    it('should render all lists', function() {
        var lists = [];
        lists['list-1'] = {name : 'My new list'};
        lists['list-2'] = {name : 'My new list 2'};

        var listRenderer = TestUtils.renderIntoDocument(
            <ListRenderer lists={lists} />
        );
        
        var rendered_lists = TestUtils.scryRenderedDOMComponentsWithClass(
            listRenderer, 'list'
        );

        setImmediate(function() {
            expect(rendered_lists.length).toEqual(2);
        });
    });
});