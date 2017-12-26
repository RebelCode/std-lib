import {FunctionalRestrictedCollection} from './../src/FunctionalRestrictedCollection.js';
var assert = require('assert');

/**
 * Simple items collection.
 *
 * @return {*[]}
 */
function createNewItems() {
    return [123, 125, 127];
}

/**
 * Create new collection based on some items.
 *
 * @param getter
 * @param setter
 * @param allowedChecker
 * @param id
 * @returns {FunctionalRestrictedCollection}
 */
function createNewCollection(getter, setter, allowedChecker, id = null) {
    id = id ? id : (item) => {
        return item.id;
    };
    return new FunctionalRestrictedCollection(getter, setter, id, allowedChecker);
}

describe('FunctionalRestrictedCollection', function() {
    describe('functional', function () {
        it('works like expected', function () {
            let items = createNewItems();
            let sampleCollection = createNewCollection(
                () => {return items;},
                (newItems) => {items = newItems;},
                (items, item) => {return items.length + 1 <= 4}
            );

            /**
             * Check collection's items getter.
             */
            assert.deepEqual(sampleCollection.getItems(), items);

            /**
             * Test collection has item checker.
             */
            assert.equal(sampleCollection.hasItem(127), true);

            /**
             * Test collection's item adding.
             */
            let testItem = {
                id: 1
            };
            sampleCollection.addItem(testItem);
            assert.equal(sampleCollection.hasItem(testItem.id), true);

            /**
             * Test collection's ability to remove items.
             */
            sampleCollection.removeItem(testItem);
            assert.equal(sampleCollection.hasItem(testItem), false);
        })
    });
    describe('unit', function () {
        /**
         * Test proper creation of collection.
         */
        describe('#constructor', function () {
            it('should fail when not all requirements passed', function () {
                assert.throws(function() {
                    createNewCollection();
                });
            });

            it('should not fail if parameters are passed right', function () {
                assert.doesNotThrow(function() {
                    let items = createNewItems();
                    createNewCollection(
                        () => {return items;},
                        (newItems) => {items = newItems;},
                        (items, item) => {return items.length + 1 <= 4}
                    );
                });
            });
        });

        /**
         * Test collection allow item adding if item is allowed.
         */
        describe('#isAllowed(item)', function() {
            it('returns true is item can be added', function() {
                let items = createNewItems();
                let sampleCollection = createNewCollection(
                    () => {return items;},
                    (newItems) => {items = newItems;},
                    (items, item) => {return items.length + 1 <= 4}
                );

                assert.equal(sampleCollection.isAllowed({id: 2}), true);
            });

            it('returns false if item cannot be added', function() {
                let items = createNewItems();
                let sampleCollection = createNewCollection(
                    () => {return items;},
                    (newItems) => {items = newItems;},
                    (items, item) => {return items.length + 1 <= 3}
                );

                assert.equal(sampleCollection.isAllowed({id: 2}), false);
            });
        });
    })
});