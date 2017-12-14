import createNewCollection from './factory'

var assert = require('assert');

describe('Collection', function() {
    describe('#addItem(item)', function() {
        it('should add new item to the collection', function() {
            let collection = createNewCollection();
            collection.addItem({
                id: 117
            });
            assert.equal(collection.hasKey(117), true);
        });
    });
});