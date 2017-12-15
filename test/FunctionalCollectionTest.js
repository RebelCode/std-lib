import {FunctionalCollection} from './../src/FunctionalCollection';
var assert = require('assert');

/**
 * Simple items collection.
 *
 * @returns {{123: {id: number}, 125: {id: number}, 127: {id: number}}}
 */
function createNewItems() {
    return {
        123: {
            id: 123
        },
        125: {
            id: 125
        },
        127: {
            id: 127
        }
    };
}

/**
 * Create new collection based on some items.
 *
 * @returns {FunctionalCollection}
 */
function createNewCollection() {
    return new FunctionalCollection(() => {
        return items
    }, (newItems) => {
        items = newItems
    }, (item) => {
        return item.id
    });
}

let items = {};
let sampleCollection;

describe('FunctionalCollection', function() {
    /**
     * This will create new items and new collection for each new test.
     */
    beforeEach(function(){
        items = createNewItems();
        sampleCollection = createNewCollection();
    });

    /**
     * Test proper creation of collection.
     */
    describe('#constructor', function () {
        it('should fail when not all requirements passed', function () {
            assert.throws(function() {
                new FunctionalCollection();
            });
        });

        it('should not fail if parameters are passed right', function () {
            assert.doesNotThrow(function() {
                new FunctionalCollection(() => {
                    return {};
                }, (_items) => {
                    // items = _items;
                }, (item) => {
                    return item.id;
                });
            });
        });
    });

    /**
     * Test collection's items getter.
     */
    describe('#getItems()', function() {
        it('check items is the same in the store object and in the collection', function() {
            assert.deepEqual(sampleCollection.getItems(), items);
        });
    });

    /**
     * Test collection's item adding.
     */
    describe('#addItem(item)', function() {
        it('add new item to the collection', function() {
            sampleCollection.addItem({
                id: 1
            });
            assert.equal(sampleCollection.hasKey(1), true);
        });

        it('add new item to the real store', function() {
            sampleCollection.addItem({
                id: 2
            });
            assert.equal(items[2].id, 2);
        });
    });

    /**
     * Test collection's ability to remove items.
     */
    describe('#removeItem(item)', function() {
        it('remove item from the collection', function() {
            sampleCollection.removeItem({
                id: 1
            });
            assert.equal(!sampleCollection.hasKey(1), true);
        });

        it('remove item from the real store', function() {
            sampleCollection.removeItem({
                id: 2
            });
            assert.equal(items[2], undefined);
        });
    });

    /**
     * Test collection has item checker.
     */
    describe('#hasItem(item)', function() {
        it('check item is presented in the real store', function() {
            assert.equal(sampleCollection.hasKey(127), true);
        });
    });
});