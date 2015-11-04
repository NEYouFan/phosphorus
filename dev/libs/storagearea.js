//author @huntbao

class StorageArea {

    static get(keys, callback) {
        chrome.storage.local.get(keys, function(data) {
            callback(data)
        })
    }

    static set(data, callback) {
        chrome.storage.local.set(data, function() {
            callback()
        })
    }

    static getBytesInUse(keys, callback) {
        chrome.storage.local.getBytesInUse(keys, function(data) {
            callback(data)
        })
    }

    static remove(keys, callback) {
        chrome.storage.local.remove(keys, function() {
            callback()
        })
    }

    static clear(callback) {
        chrome.storage.local.clear(keys, function() {
            callback()
        })
    }

}


export default StorageArea