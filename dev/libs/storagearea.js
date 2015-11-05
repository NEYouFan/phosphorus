//author @huntbao

class StorageArea {

    static get(keys, callback) {
        chrome.storage.local.get(keys, function (data) {
            callback && callback(data)
        })
    }

    static set(data, callback) {
        chrome.storage.local.set(data, function () {
            callback && callback()
        })
    }

    static getBytesInUse(keys, callback) {
        chrome.storage.local.getBytesInUse(keys, (data) => {
            callback && callback(data)
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


export default StorageArea