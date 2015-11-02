//author @huntbao
'use strict'

let FileSystem = {

    __initialized: false,

    __fs: false,

    init(callback) {
        window.webkitRequestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, (filesystem) => {
            this.onInitFs(filesystem)
            this.__initialized = true
            callback()
        }, this.errorHandler)
    },

    onInitFs(filesystem) {
        this.__fs = filesystem
    },

    errorHandler(e) {
        var msg = ''
        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR'
                break
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR'
                break
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR'
                break
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR'
                break
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR'
                break
            default:
                msg = 'Unknown Error'
                break
        }
        console.log('Error: ' + msg)
    },

    removeFileIfExists(name, callback) {
        try {
            this.__fs.root.getFile(name, {create: false}, (fileEntry) => {
                fileEntry.remove(function () {
                    callback()
                }, function () {
                    callback()
                })
            }, function () {
                callback()
            })
        } catch (e) {
            callback()
        }
    },

    write(name, data, type, callback) {
        if (!this.__initialized) {
            this.init(() => {
                this.write(name, type, callback)
            })
        }
        name = encodeURI(name)
        name = name.replace('/', '_')
        this.removeFileIfExists(name, () => {
            this.__fs.root.getFile(name, {create: true}, function (fileEntry) {
                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.onwriteend = function (e) {
                        var properties = {
                            url: fileEntry.toURL()
                        }

                        callback(properties.url)
                    }
                    fileWriter.onerror = function (e) {
                        callback(false)
                    }
                    let blob
                    if (type === 'pdf') {
                        blob = new Blob([data], {type: 'application/pdf'})
                    } else {
                        blob = new Blob([data], {type: 'text/plain'})
                    }
                    fileWriter.write(blob)
                }, this.errorHandler)
            }, this.errorHandler)
        })
    }

}

export default FileSystem