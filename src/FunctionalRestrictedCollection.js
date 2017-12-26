import {FunctionalArrayCollection} from './FunctionalArrayCollection'

/**
 * Restricted collection.
 *
 * This collection add ability to check is
 * item allowed to be added to the collection.
 *
 * Uses consumer's function for checking.
 *
 * @since [*next-version*]
 */
export class FunctionalRestrictedCollection extends FunctionalArrayCollection {
    _itemAllowed;

    /**
     * Constructor.
     *
     * @since [*next-version*]
     *
     * @param {Function} getItems
     * @param {Function} setItems
     * @param {Function} keyGetter
     * @param {Function} itemAllowed Function that determines item allowed or not.
     */
    constructor (getItems, setItems, keyGetter, itemAllowed) {
        if (!itemAllowed) {
            throw new Error(`Item allowed checker must be provided`)
        }

        super(getItems, setItems, keyGetter)

        this._itemAllowed = itemAllowed
    }

    /**
     * If item can be added to the collection
     *
     * @since [*next-version*]
     *
     * @param {object} item Item to be checked is allowed or not.
     * @return {Boolean} Is item allowed to be added to the collection.
     */
    isAllowed (item) {
        return this._itemAllowed(this.getItems(), item)
    }
}