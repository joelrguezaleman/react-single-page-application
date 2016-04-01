jest.dontMock('../src/scripts/components/ListManager');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ListManager = require('../src/scripts/components/ListManager');

describe('ListManager', function() {

    var list_manager;
    var event;
    var lists;

    var updateLists = function(lists) {
        return lists;
    };
    var updateCurrentList = function(current_list) {
        return current_list;
    };

    beforeEach(function() {
        lists = {};

        list_manager = TestUtils.renderIntoDocument(
            <ListManager
                updateLists={updateLists}
                updateCurrentList={updateCurrentList}
                lists={lists}
                />
        );

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
            },
            preventDefault : function () {}
        };
    });

    it('adds a new list', function() {
        list_manager.createList(event);

        expect(Object.keys(lists).length).toEqual(1);
    });

    it('deletes a list', function() {
        list_manager.createList(event);

        var list_id = Object.keys(lists)[0];
        event.target.parentNode.childNodes[0].id = list_id;
        list_manager.deleteList(event);

        expect(Object.keys(lists).length).toEqual(0);
    });
});