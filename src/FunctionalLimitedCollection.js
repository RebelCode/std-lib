import {FunctionalArrayCollection} from './FunctionalArrayCollection'

/**
 * Throw Error if add new item to collection and collection
 * hold too many items.
 *
 * @since [*next-version*]
 *
 * @type {string}
 */
export const FLC_OVERFLOW_THROW = 'throw';

/**
 * Start adding item to the collection from start if
 * there are to many items in the collection.
 *
 * @since [*next-version*]
 *
 * @type {string}
 */
export const FLC_OVERFLOW_START = 'start';

/**
 * Functional limited collection that works with arrays under the hood
 * and can hold maximal amount of items.
 *
 * @since [*next-version*]
 */
export class FunctionalLimitedCollection extends FunctionalArrayCollection {

    /**
     * @var {Number} Count of maximal items count in collection.
     *
     * @since [*next-version*]
     */
    _limit;

    /**
     * @var {String} Define how to deal with items overflow.
     *
     * @since [*next-version*]
     */
    _overflowMode;

    /**
     * @var {Number} Index of last added items.
     *
     * @since [*next-version*]
     */
    _lastAddedIndex;

    /**
     * Constructor.
     *
     * @since [*next-version*]
     *
     * @param {Function} getItems The function used to retrieve the state of the item set.
     * @param {Function} setItems The function used to commit the new state of the item set.
     * @param {Function} keyGetter The function used to get item's key.
     * @param {Number} limit Count of maximal items count in collection.
     * @param {String} overflowMode Define how to deal with items overflow.
     */
    constructor (getItems, setItems, keyGetter, limit, overflowMode) {
        if (!limit) {
            throw new Error(`Collection limit must be provided`)
        }

        if (!overflowMode) {
            throw new Error(`Overflow mode for collection must be provided`)
        }

        super(getItems, setItems, keyGetter)

        this._limit = limit
        this._overflowMode = overflowMode
    }

    /**
     * Adds an item to a set.
     *
     * @since [*next-version*]
     *
     * @param {Array} items The item set.
     * @param {Object} item The item to add.
     *
     * @return {Array} The modified items set.
     */
    _addItem (items, item) {
        if (items.length + 1 > this._limit) {
            switch (this._overflowMode) {
                case FLC_OVERFLOW_THROW:
                    throw new Error(`Limited collection can hold not more that ${this._limit} items`)
                    break
                case FLC_OVERFLOW_START:
                    return this._addItemToStart(items, item)
                    break
            }
        }

        items = items.slice()
        items.push(item)
        return items
    }

    /**
     * Add item to collection's start, filling whole collection
     * like a circle.
     *
     * @since [*next-version*]
     *
     * @param {Array} items The item set.
     * @param {Object} item The item to add.
     *
     * @return {Array} New item set with added items.
     * @private
     */
    _addItemToStart (items, item) {
        if (this._lastAddedIndex === undefined || this._lastAddedIndex == items.length - 1) {
            this._lastAddedIndex = -1
        }

        this._lastAddedIndex++

        items = items.slice()
        items[this._lastAddedIndex] = item
        return items
    }
}
