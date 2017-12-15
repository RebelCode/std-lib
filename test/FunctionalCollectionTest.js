import {FunctionalCollection} from './../src/FunctionalCollection';

var assert = require('assert');

describe('FunctionalCollection', function() {
    describe('#addItem(item)', function() {
        it('should add new item to the collection', function() {
            let collection = createNewFunctionalCollection();
            collection.addItem({
                id: 117
            });
            assert.equal(collection.hasKey(117), true);
        });
    });
});

/**
 * Create new simple collection fo testing purposes.
 * @returns {FunctionalCollection}
 */
function createNewFunctionalCollection () {
    let items = {
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

    return new FunctionalCollection(() => {
        return items
    }, (newItems) => {
        items = newItems
    }, (item) => {return item.id})
};