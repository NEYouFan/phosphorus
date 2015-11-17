//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import async from 'async'
import UUID from 'node-uuid'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Util from '../libs/util'
import StorageArea from '../libs/storagearea'
import Requester from '../components/requester/requester'
import ReqTabStore from './reqtabstore'

const CHANGE_EVENT = 'change'
const DEFAULT_HISTORY = {
    id: null,
    name: null,
    url: null,
    requests: []
}
const DEFAULT_COLLECTION = {
    id: null,
    name: null,
    host: null,
    description: null,
    requests: [],
    folders: [],
    createTime: null
}
const DEFAULT_FOLDER = {
    id: null,
    name: null,
    host: null,
    description: null,
    orders: [],
    createTime: null
}
const DEFAULT_REQUEST = {
    collectionId: null,
    description: null,
    folderId: null,
    id: null,
    method: null,
    name: null,
    host: null,
    path: null
}

let tabs = {
    activeTabName: 'Collections',
    activeReqId: null
}

let NEI_SERVER_URL = 'http://nei.hz.netease.com'
//let NEI_SERVER_URL = 'http://127.0.0.1'
let historyData = null
let collectionsData = null
let collectionActionMenus = ['Edit host', 'Add folder', 'Edit', 'Delete']
let folderActionMenus = ['Edit host', 'Edit', 'Delete']
let reqActionMenus = ['Edit', 'Delete']

let actions = {

    changeIndex(activeTabName) {
        tabs.activeTabName = activeTabName
    },

    fetchCollections(callback) {
        // already fetched
        if (collectionsData !== null) return
        //StorageArea.clear()
        //return
        StorageArea.get(['hosts', 'collections', 'requests'], (result) => {
            console.log(result)
            let hosts = result.hosts || {}
            hosts.collections = hosts.collections || {}
            hosts.folders = hosts.folders || {}
            collectionsData = result.collections || []
            Util.fetchNEICollections(NEI_SERVER_URL, hosts, (collections, res) => {
                collectionsData.unshift(...collections)
                callback()
            })
        })
    },

    changeCollHost(collection, host, callback) {
        let foundCollection = _.find(collectionsData, (c) => {
            return c.id = collection.id
        })
        foundCollection.host = host
        StorageArea.get('hosts', (result) => {
            let hosts = result.hosts || {}
            hosts.collections = hosts.collections || {}
            hosts.collections[collection.id] = host
            StorageArea.set({'hosts': hosts}, () => {
                let activeTab = ReqTabStore.getActiveTab()
                if (activeTab.url) {
                    let activeRequest
                    activeRequest = _.find(foundCollection.requests, (req) => {
                        return req.id === activeTab.id
                    })
                    if (activeRequest) {
                        let folder = _.find(foundCollection.folders, (folder) => {
                            return activeRequest.folderId === folder.id
                        })
                        // the active request is in the folder which has been changed host
                        // should change tab url's host
                        activeTab.url = Util.replaceURLHost(activeTab.url, folder.host || host)
                    }
                }
                callback()
            })
        })
    },

    changeFolderHost(folder, host, callback) {
        let foundCollection = _.find(collectionsData, (c) => {
            return c.id == folder.collectionId
        })
        let foundFolder = _.find(foundCollection.folders, (f) => {
            return f.id == folder.id
        })
        foundFolder.host = host
        StorageArea.get('hosts', (result) => {
            let hosts = result.hosts || {}
            hosts.folders = hosts.folders || {}
            hosts.folders[folder.id] = host
            StorageArea.set({'hosts': hosts}, () => {
                let activeTab = ReqTabStore.getActiveTab()
                if (activeTab.url) {
                    let activeRequest
                    activeRequest = _.find(foundCollection.requests, (req) => {
                        return req.id === activeTab.id
                    })
                    if (activeRequest) {
                        // the active request is in the folder which has been changed host
                        // should change tab url's host
                        activeTab.url = Util.replaceURLHost(activeTab.url, host || foundCollection.host)
                    }
                }
                callback()
            })
        })
    },

    changeActiveReqId(reqId) {
        tabs.activeReqId = reqId
    },

    createCollection(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let item = Object.assign({}, DEFAULT_COLLECTION, {
                id: UUID.v1(),
                name: options.name,
                description: options.description,
                createTime: Date.now()
            })
            collections.push(item)
            StorageArea.set({'collections': collections}, () => {
                collectionsData.push(item)
                callback(item)
            })
        })
    },

    addReqToCollection(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let storedCollection = _.find(collections, (c) => {
                return c.id === options.collectionId
            })
            let reqItem = Object.assign({}, DEFAULT_REQUEST, {
                id: UUID.v1(),
                method: options.method,
                name: options.name,
                description: options.description,
                path: options.path,
                collectionId: options.collectionId,
                folderId: options.folderId
            })
            if (options.folderId) {
                let folder = _.find(storedCollection.folders, (f) => {
                    return f.id === options.folderId
                })
                folder.orders.push(reqItem.id)
            }
            storedCollection.requests.push(reqItem)
            // update ui
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.collectionId
            })
            collection.requests.push(reqItem)
            if (options.folderId) {
                let folder = _.find(collection.folders, (f) => {
                    return f.id === options.folderId
                })
                folder.orders.push(reqItem.id)
            }
            StorageArea.set({'collections': collections}, () => {
                callback(reqItem)
            })
        })
    },

    updateActiveReq(options, callback){
        if (!options || !options.id) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let storedReq = null
            collections.forEach((c) => {
                storedReq = _.find(c.requests, (req) => {
                    return req.id === tabs.activeReqId
                })
            })
            // can update: path, url, name, description
            let updateFields = ['path', 'method']
            updateFields.forEach((field) => {
                if (options.hasOwnProperty(field)) {
                    storedReq[field] = options[field]
                }
            })
            // update ui
            let req = null
            collectionsData.forEach((c) => {
                req = _.find(c.requests, (req) => {
                    return req.id === tabs.activeReqId
                })
            })
            updateFields.forEach((field) => {
                if (options.hasOwnProperty(field)) {
                    req[field] = options[field]
                }
            })
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    editCollection(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            Object.assign(options.collection, {
                name: options.name,
                description: options.description
            })
            let savedCollection = _.find(collections, (c) => {
                return c.id === options.collection.id
            })
            Object.assign(savedCollection, {
                name: options.name,
                description: options.description
            })
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    createFolder(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            let item = Object.assign({}, DEFAULT_FOLDER, {
                id: UUID.v1(),
                name: options.name,
                description: options.description,
                orders: [],
                createTime: Date.now()
            })
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.collection.id
            })
            collection.folders.push(item)
            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.collection.id
            })
            savedCollection.folders.push(item)
            StorageArea.set({'collections': savedCollections}, () => {
                callback()
            })
        })
    },

    deleteCollection(options, callback) {
        if (!options || !options.id) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            // update ui
            _.remove(collectionsData, (c) => {
                return c.id === options.id
            })
            _.remove(savedCollections, (c) => {
                return c.id === options.id
            })
            // update storage
            StorageArea.set({'collections': savedCollections}, () => {
                callback()
            })
        })
    },

    editFolder(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.folder.collectionId
            })
            let folder = _.find(collection.folders, (f) => {
                return f.id === options.folder.id
            })
            Object.assign(folder, {
                name: options.name,
                description: options.description
            })
            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.folder.collectionId
            })
            let savedFolder = _.find(savedCollection.folders, (f) => {
                return f.id === options.folder.id
            })
            Object.assign(savedFolder, {
                name: options.name,
                description: options.description
            })
            StorageArea.set({'collections': savedCollections}, () => {
                callback()
            })
        })
    },

    deleteFolder(options, callback) {
        if (!options || !options.collectionId || !options.id) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.collectionId
            })
            _.remove(collection.folders, (f) => {
                return f.id === options.id
            })
            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.collectionId
            })
            _.remove(savedCollection.folders, (f) => {
                return f.id === options.id
            })
            StorageArea.set({'collections': savedCollections}, () => {
                callback()
            })
        })
    },

    saveNewRequest(options, callback) {
        if (!options || !options.collectionId && !options.id && !options.newCollName) {
            return callback()
        }
        let addReq = (collectionId) => {
            this.addReqToCollection({
                method: options.tab.method,
                name: options.name || options.tab.url,
                description: options.description,
                path: options.tab.url,
                collectionId: collectionId,
                folderId: options.folderId
            }, (reqItem) => {
                // change to new tab
                options.tab.id = reqItem.id
                options.tab.name = reqItem.name
                options.tab.isDirty = false
                ReqTabStore.changeTab(options.tab)
                // add request to local store
                ReqTabStore.saveTabToLocal(callback)
            })
        }
        if (options.newCollName) {
            // create a new collection
            this.createCollection({
                name: options.newCollName,
                description: ''
            }, (createdCollection) => {
                addReq(createdCollection.id)
            })
        } else {
            addReq(options.collectionId)
        }
    },

    editRequest(options, callback) {
        if (!options) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.req.collectionId
            })
            let request = _.find(collection.requests, (r) => {
                return r.id === options.req.id
            })
            Object.assign(request, {
                name: options.name,
                description: options.description
            })
            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.req.collectionId
            })
            let savedRequest = _.find(savedCollection.requests, (c) => {
                return c.id === options.req.id
            })
            Object.assign(savedRequest, {
                name: options.name,
                description: options.description
            })
            StorageArea.set({'collections': savedCollections}, () => {
                callback()
            })
        })
    },

    deleteRequest(options, callback) {
        if (!options || !options.id) {
            return callback()
        }
        StorageArea.get('collections', (result) => {
            let savedCollections = result.collections || []
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.collectionId
            })
            _.remove(collection.requests, (r) => {
                return r.id === options.id
            })
            collection.folders.forEach((folder) => {
                _.remove(folder.orders, (order) => {
                    return order === options.id
                })
            })
            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.collectionId
            })
            _.remove(savedCollection.requests, (c) => {
                return c.id === options.id
            })
            savedCollection.folders.forEach((folder) => {
                _.remove(folder.orders, (order) => {
                    return order === options.id
                })
            })
            async.parallel([
                (cb) => {
                    StorageArea.set({'collections': savedCollections}, () => {
                        cb(null)
                    })
                },
                // delete request in local store `requests`
                (cb) => {
                    ReqTabStore.deleteTabData({
                        id: options.id
                    }, () => {
                        cb(null)
                    })
                }
            ], (err) => {
                callback()
            })
        })
    }
}

let SideTabStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            sideTab: {
                tabs: tabs,
                histories: historyData,
                collections: collectionsData,
                actionMenus: {
                    collection: collectionActionMenus,
                    folder: folderActionMenus,
                    request: reqActionMenus
                }
            }
        }
    },

    getCollections() {
        return collectionsData.filter((c) => {
            return !c.isNEI
        })
    },

    updateActiveReq(options, callback) {
        actions.updateActiveReq(options, callback)
    },

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

AppDispatcher.register((action) => {

    switch (action.actionType) {

        case AppConstants.SIDE_TAB_CHANGE_ACTIVE_NAME:
            actions.changeIndex(action.activeTabName)
            SideTabStore.emitChange()
            break

        case AppConstants.SIDE_TAB_FETCH_COLLECTIONS:
            actions.fetchCollections(() => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_CHANGE_COLL_HOST:
            actions.changeCollHost(action.collection, action.host, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_CHANGE_FOLDER_HOST:
            actions.changeFolderHost(action.folder, action.host, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_CHANGE_ACTIVE_REQ_ID:
            actions.changeActiveReqId(action.reqId)
            SideTabStore.emitChange()
            break

        case AppConstants.SIDE_CREATE_COLLECTION:
            actions.createCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_EDIT_COLLECTION:
            actions.editCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_CREATE_FOLDER:
            actions.createFolder(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_DELETE_COLLECTION:
            actions.deleteCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_EDIT_FOLDER:
            actions.editFolder(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_DELETE_FOLDER:
            actions.deleteFolder(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_SAVE_NEW_REQUEST:
            actions.saveNewRequest(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_EDIT_REQUEST:
            actions.editRequest(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_DELETE_REQUEST:
            actions.deleteRequest(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        default:
            break
    }

})

export default SideTabStore
