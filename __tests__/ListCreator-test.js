jest.dontMock('../src/scripts/components/ListCreator');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListCreator = require('../src/scripts/components/ListCreator');

describe('ListCreator', function() {
    it('should exist', function() {
        var listCreator = TestUtils.renderIntoDocument(<ListCreator/>);
        expect(TestUtils.isCompositeComponent(listCreator)).toBeTruthy();
    });
});