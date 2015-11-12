//author @huntbao

class StorageArea {

    static get(keys, callback) {
        chrome.storage.local.get(keys, function (result) {
            callback(result)
        })
    }

    static set(data, callback) {
        chrome.storage.local.set(data, function () {
            callback && callback()
        })
    }

    static remove(keys, callback) {
        chrome.storage.local.remove(keys, () => {
            callback && callback()
        })
    }

    static clear(callback) {
        chrome.storage.local.clear(() => {
            callback && callback()
        })
    }

}

/**
 * saved data structure
 * {
 *      hosts: {
 *          collections: {
 *              collection_id: xxx,
 *              ...
 *          },
 *          folders: {
 *              folder_id: xxx
 *              ...
 *          },
 *      },
 *
 *      requests: {
 *          request_id: {
 *              // it's fields are declared in request_data_map.js
 *          }
 *      },
 *
 *      collections: {
 *          // it's fields are declared in sidetabstore.js@DEFAULT_COLLECTION
 *      }
 * }
 *
 *
 */


export default StorageArea