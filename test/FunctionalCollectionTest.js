import {FunctionalCollection} from './../src/FunctionalCollection';
var assert = require('assert');

var items = {
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

/**
 * Testing collection sample.
 *
 * @type {FunctionalCollection}
 */
var sampleCollection = new FunctionalCollection(() => {
    return items
}, (newItems) => {
    items = newItems
}, (item) => {return item.id});

describe('FunctionalCollection', function() {
    describe('#constructor', function () {
        it('should fail when not all requirements passed', function () {
            assert.throws(function() {
                new FunctionalCollection();
            });
        });

        it('should not fail if parameters are passed right', function () {
            assert.doesNotThrow(function() {
                new FunctionalCollection(() => {
                    return items;
                }, (_items) => {
                    items = _items;
                }, (item) => {
                    return item.id;
                });
            });
        });
    });

    describe('#getItems()', function() {
        it('check items is the same in the store object and in the collection', function() {
            assert.deepEqual(sampleCollection.getItems(), items);
        });
    });

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

    describe('#hasItem(item)', function() {
        it('check item is presented in the real store', function() {
            assert.equal(sampleCollection.hasKey(127), true);
        });
    });
});