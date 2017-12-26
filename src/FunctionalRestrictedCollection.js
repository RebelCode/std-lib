import {FunctionalArrayCollection} from './FunctionalArrayCollection'

/**
 * Restricted collection
 */
export class FunctionalRestrictedCollection extends FunctionalArrayCollection {
    _itemAllowed;

    /**
     * Constructor.
     *
     * @param {Function} getItems
     * @param {Function} setItems
     * @param {Function} keyGetter
     * @param {Function} itemAllowed
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
     * @param item
     */
    isAllowed (item) {
        return this._itemAllowed(this.getItems(), item)
    }

    /**
     * Add item key
     *
     * @param item
     */
    addItemId (item) {
        if (!this.isAllowed(item)) {
            throw new Error(`Cannot add item id to the collection`)
        }

        this.addItem(this._keyGetter(item))
    }
}