jest.dontMock('../src/scripts/components/ElementManager');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var ElementManager = require('../src/scripts/components/ElementManager');

describe('ElementManager', function() {

    var element_manager;
    var event;
    var lists;
    var current_list;

    var updateLists = function(lists) {
        return lists;
    };
    var updateCurrentList = function(current_list) {
        return current_list;
    };

    beforeEach(function() {
        lists = {
            list_1 : {
                name : 'List 1',
                elements : []
            }
        };
        current_list = 'list_1';

        element_manager = TestUtils.renderIntoDocument(
            <ElementManager
                updateLists={updateLists}
                updateCurrentList={updateCurrentList}
                lists={lists}
                current_list={current_list}
                />
        );

        event = {
            keyCode : 13,
            target : {
                parentNode : {
                    childNodes : [{
                        id : 0
                    }]
                }
            },
            preventDefault : function () {}
        };
    });

    it('adds a new element', function() {
        element_manager.createElement(event);

        expect(lists[current_list].elements.length).toEqual(1);
    });

    it('deletes an element', function() {
        element_manager.createElement(event);
        element_manager.deleteElement(event);

        expect(lists[current_list].elements.length).toEqual(0);
    });
});