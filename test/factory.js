import {Collection} from './../src/Collection';

/**
 * Create new simple collection fo testing purposes.
 * @returns {Collection}
 */
export default function createNewCollection () {
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

    return new Collection(() => {
        return items
    }, (newItems) => {
        items = newItems
    }, (item) => {return item.id})
};