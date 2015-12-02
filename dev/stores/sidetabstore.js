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
import ReqTabConStore from './reqtabconstore'
import ModalStore from './modalstore'

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
    activeReqId: null,
    loadingTip: {
        show: false,
        text: 'loading...'
    }
}

let NEI_SERVER_URL = 'http://nei.hz.netease.com'
//let NEI_SERVER_URL = 'http://127.0.0.1'
//let NEI_SERVER_URL = 'http://10.165.124.56:8080'
let historyData = []
let collectionsData = []
let collectionActionMenus = ['Edit host', 'Add folder', 'Edit', 'Synchronize', 'Run all', 'Delete']
let folderActionMenus = ['Edit host', 'Edit', 'Delete']
let reqActionMenus = ['Edit', 'Move', 'Delete']

let actions = {

    changeIndex(activeTabName) {
        tabs.activeTabName = activeTabName
    },

    setLoadingTip(tip) {
        Object.assign(tabs.loadingTip, tip)
    },

    getCollections(callback) {
        //StorageArea.clear()
        //return
        StorageArea.get(['hosts', 'collections', 'requests'], (result) => {
            console.log(result)
            let hosts = result.hosts || {}
            hosts.collections = hosts.collections || {}
            hosts.folders = hosts.folders || {}
            let collections = result.collections || []
            let requests = result.requests || {}
            collectionsData = result.collections || []
            // for corrupt data
            _.remove(collectionsData, (c) => {
                if (!c || typeof(c) === 'object' && !Object.keys(c).length) {
                    return true
                }
            })
            collectionsData.forEach((c) => {
                c.host = hosts.collections[c.id]
                c.folders.forEach((f) => {
                    f.host = hosts.folders[f.id]
                })
            })
            callback()
            StorageArea.set({
                hosts: hosts,
                collections: collections,
                requests: requests
            })
        })
    },

    clearLocalStorage(callback) {
        StorageArea.clear(() => {
            // clear all opend tabs
            async.eachSeries(collectionsData, (c, cb) => {
                async.eachSeries(c.requests, (req, cbb) => {
                    ReqTabStore.removeTabById(req.id, cbb)
                }, (err) => {
                    cb()
                })
            }, (err) => {
                collectionsData = []
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
        let dealData = (collections, newItem) => {
            collections.push(newItem)
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let item = Object.assign({}, DEFAULT_COLLECTION, {
                id: UUID.v1(),
                name: options.name,
                description: options.description,
                createTime: Date.now()
            })
            dealData(collections, item)
            dealData(collectionsData, item)
            StorageArea.set({'collections': collections}, () => {
                callback(item)
            })
        })
    },

    importCollection(options, callback) {
        if (!options || !options.id) {
            return callback()
        }
        // check if collection is already been imported
        let foundCollection = _.find(collectionsData, (c) => {
            return c.id === options.id
        })
        if (foundCollection) {
            // pop up tips
            ModalStore.openModal(AppConstants.MODAL_COLLECTION_ALREADY_BEEN_IMPORTED_TIP)
            return callback()
        }
        tabs.loadingTip = {
            show: true,
            text: 'Importing...'
        }
        callback() // callback to show loading
        Util.fetchNEIProject(NEI_SERVER_URL, options.id, (res, collection) => {
            if (!res || !res.ok || !collection) {
                tabs.loadingTip.text = 'Importing failed'
                setTimeout(() => {
                    tabs.loadingTip.show = false
                    callback()
                }, 5000)
                return callback()
            }
            let dealData = (collections) => {
                collections.unshift(collection)
            }
            StorageArea.get('collections', (result) => {
                let collections = result.collections
                dealData(collections)
                dealData(collectionsData)
                StorageArea.set({'collections': collections}, () => {
                    tabs.loadingTip.show = false
                    callback()
                })
            })
        })
    },

    syncCollection(options, callback) {
        if (!options || !options.id || !options.isNEI) {
            return callback()
        }
        tabs.loadingTip = {
            show: true,
            text: 'Synchronizing...'
        }
        callback() // callback to show tip
        Util.fetchNEIProject(NEI_SERVER_URL, options.id, (response, collection) => {
            if (!response.ok) {
                tabs.loadingTip.text = 'Sync failed'
                setTimeout(() => {
                    tabs.loadingTip.show = false
                    callback()
                }, 5000)
                return callback()
            }
            let dealData = (collections, hosts) => {
                collections.forEach((c, index, collections) => {
                    if (c.id === options.id) {
                        let oldReqOrders = collections[index].requests.map((req) => {
                            return req.id
                        })
                        let newRequests = []
                        oldReqOrders.forEach((reqId) => {
                            let req = _.find(collection.requests, (req) => {
                                return req.id === reqId
                            })
                            // request exist
                            if (req) {
                                newRequests.push(req)
                                _.remove(collection.requests, (req) => {
                                    return req.id === reqId
                                })
                            }
                        })
                        collection.requests = newRequests.concat(collection.requests)
                        collection.host = hosts.collections[collection.id]
                        collections[index] = collection
                    }
                })
            }
            StorageArea.get(['collections', 'requests', 'hosts'], (result) => {
                let collections = result.collections
                let requests = result.requests
                let hosts = result.hosts
                dealData(collections, hosts)
                dealData(collectionsData, hosts)
                // remove requests which has been deleted by nei
                _.forEach(requests, (req) => {
                    let found = _.find(collections, (c) => {
                        return _.find(c.requests, (r) => {
                            return r.id === req && req.id
                        })
                    })
                    if (found) {
                        delete result.requests[req.id]
                    }
                })
                StorageArea.set({collections: collections, requests: requests}, () => {
                    tabs.loadingTip.text = 'Sync succeed'
                    setTimeout(() => {
                        tabs.loadingTip.show = false
                        callback()
                    }, 3000)
                    // after sync, there is many things to think about,
                    // here, just remove all opened tabs of this collection
                    ReqTabStore.removeCollectionTabs(options.id, callback)
                })
            })
        })
    },

    runCollection(options, callback) {
        StorageArea.get(['collections', 'requests', 'hosts'], (result) => {
            let collection = _.find(collectionsData, (c) => {
                return c.id === options.id
            })
            Requester.runCollection(collection, result, callback)
        })
    },

    addReqToCollection(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        let dealData = (collections, reqItem) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.collectionId
            })
            if (options.folderId) {
                let folder = _.find(collection.folders, (f) => {
                    return f.id === options.folderId
                })
                folder.orders.push(reqItem.id)
            }
            collection.requests.push(reqItem)
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let reqItem = Object.assign({}, DEFAULT_REQUEST, {
                id: UUID.v1(),
                method: options.method,
                name: options.name,
                description: options.description,
                path: options.path,
                collectionId: options.collectionId,
                folderId: options.folderId
            })
            dealData(collectionsData, reqItem)
            dealData(collections, reqItem)
            StorageArea.set({'collections': collections}, () => {
                callback(reqItem)
            })
        })
    },

    updateActiveReq(options, callback){
        if (!options || !options.id) {
            return callback()
        }
        let dealData = (collections) => {
            let req = null
            collections.find((c) => {
                // nei collections cannot be changed
                if (!c.isNEI) {
                    req = _.find(c.requests, (req) => {
                        return req.id === tabs.activeReqId
                    })
                }
                return req
            })
            if (req) {
                // can update: path, url, name, description
                let updateFields = ['path', 'method']
                updateFields.forEach((field) => {
                    if (options.hasOwnProperty(field)) {
                        req[field] = options[field]
                    }
                })
            }
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            dealData(collections)
            dealData(collectionsData)
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
        let dealData = (collections, newFolder) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.collection.id
            })
            collection.folders.push(newFolder)
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            let item = Object.assign({}, DEFAULT_FOLDER, {
                id: UUID.v1(),
                name: options.name,
                description: options.description,
                orders: [],
                createTime: Date.now()
            })
            dealData(collectionsData, item)
            dealData(collections, item)
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    deleteCollection(options, callback) {
        if (!options || !options.id) {
            return callback()
        }
        StorageArea.get(['hosts', 'collections', 'requests'], (result) => {
            let collections = result.collections
            let hosts = result.hosts
            let requests = result.requests
            _.remove(collectionsData, (c) => {
                return c.id === options.id
            })
            let removedCollections = _.remove(collections, (c) => {
                return c.id === options.id
            })
            removedCollections[0].requests.forEach((req) => {
                delete requests[req.id]
            })
            removedCollections[0].folders.forEach((folder) => {
                delete hosts.folders[folder.id]
            })
            delete hosts.collections[options.id]
            async.waterfall([
                (cb) => {
                    StorageArea.set({
                        collections: collections,
                        hosts: hosts,
                        requests: requests
                    }, cb)
                },
                // remove all tabs if opened
                (cb) => {
                    async.eachSeries(removedCollections[0].requests, (req, cbb) => {
                        ReqTabStore.removeTabById(req.id, cbb)
                    }, (err) => {
                        cb()
                    })
                }
            ], (err) => {
                callback()
            })
        })
    },

    editFolder(options, callback) {
        if (!options || !options.name) {
            return callback()
        }
        let dealData = (collections) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.folder.collectionId
            })
            let folder = _.find(collection.folders, (f) => {
                return f.id === options.folder.id
            })
            Object.assign(folder, {
                name: options.name,
                description: options.description
            })
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            dealData(collectionsData)
            dealData(collections)
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    deleteFolder(options, callback) {
        if (!options || !options.collectionId || !options.id) {
            return callback()
        }
        let dealData = (collections) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.collectionId
            })
            let removedFolders = _.remove(collection.folders, (f) => {
                return f.id === options.id
            })
            _.remove(collection.requests, (req) => {
                return req.folderId === options.id
            })
            return removedFolders[0]
        }
        StorageArea.get(['hosts', 'collections', 'requests'], (result) => {
            let collections = result.collections
            let hosts = result.hosts
            let requests = result.requests
            dealData(collectionsData)
            let removedFolder = dealData(collections)
            removedFolder.orders.forEach((order) => {
                delete requests[order]
            })
            delete hosts.folders[removedFolder.id]
            async.waterfall([
                (cb) => {
                    StorageArea.set({
                        collections: collections,
                        hosts: hosts,
                        requests: requests
                    }, cb)
                },
                // remove all tabs if opened
                (cb) => {
                    async.eachSeries(removedFolder.orders, (order, cbb) => {
                        ReqTabStore.removeTabById(order, cbb)
                    }, (err) => {
                        cb()
                    })
                }
            ], (err) => {
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
                Object.assign(options.tab, {
                    id: reqItem.id,
                    name: reqItem.name,
                    isDirty: false,
                    folderId: options.folderId,
                    collectionId: collectionId
                })
                ReqTabStore.changeTab(options.tab)
                // highlight saved request
                tabs.activeReqId = reqItem.id
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
        let dealData = (collections) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.req.collectionId
            })
            let request = _.find(collection.requests, (r) => {
                return r.id === options.req.id
            })
            Object.assign(request, {
                name: options.name,
                description: options.description
            })
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            dealData(collectionsData)
            dealData(collections)
            // update tab name
            ReqTabStore.updateTabName(options.req.id, options.name)
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    moveRequest(options, callback) {
        if (!options) {
            return callback()
        }
        let dealData = (collections) => {
            // old collection
            let oldCollection = _.find(collections, (c) => {
                return c.id === options.req.collectionId
            })
            let request = _.find(oldCollection.requests, (r) => {
                return r.id === options.req.id
            })
            _.remove(oldCollection.requests, (r) => {
                return r.id === request.id
            })
            if (options.req.folderId) {
                let folder = _.find(oldCollection.folders, (f) => {
                    return f.id === options.req.folderId
                })
                _.remove(folder.orders, (order) => {
                    return order === request.id
                })
            }
            Object.assign(request, {
                collectionId: options.collectionId,
                folderId: options.folderId
            })
            // new collection
            let newCollectoin = _.find(collections, (c) => {
                return c.id === options.collectionId
            })
            newCollectoin.requests.push(request)
            if (options.folderId) {
                let folder = _.find(newCollectoin.folders, (f) => {
                    return f.id === options.folderId
                })
                folder.orders.push(request.id)
            }
        }
        StorageArea.get('collections', (result) => {
            let collections = result.collections || []
            dealData(collectionsData)
            dealData(collections)
            StorageArea.set({'collections': collections}, () => {
                callback()
            })
        })
    },

    deleteRequest(options, callback) {
        if (!options || !options.id) {
            return callback()
        }
        let dealData = (collections) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.collectionId
            })
            let removedRequests = _.remove(collection.requests, (r) => {
                return r.id === options.id
            })
            collection.folders.forEach((folder) => {
                _.remove(folder.orders, (order) => {
                    return order === options.id
                })
            })
            return removedRequests[0]
        }
        StorageArea.get(['collections', 'requests'], (result) => {
            let collections = result.collections
            let requests = result.requests
            dealData(collectionsData)
            let removedRequest = dealData(collections)
            delete requests[removedRequest.id]
            async.waterfall([
                (cb) => {
                    StorageArea.set({
                        collections: collections,
                        requests: requests
                    }, cb)
                },
                // remove tab if the request is opened
                (cb) => {
                    ReqTabStore.removeTabById(removedRequest.id, cb)
                }
            ], (err) => {
                callback()
            })
        })
    },

    dragReq(options, callback) {
        if (!options || !options.draggedId || !options.droppedId) {
            return callback()
        }
        let dealData = (collections) => {
            let collection = _.find(collections, (c) => {
                return c.id === options.collection.id
            })
            if (options.folder) {
                // dragged req is in folder
                let folder = _.find(collection.folders, (folder) => {
                    return folder.id === options.folder.id
                })
                let orders = folder.orders
                _.remove(orders, (order) => {
                    return order === options.draggedId
                })
                for (let i = 0, l = orders.length; i < l; i++) {
                    if (orders[i] === options.droppedId) {
                        if (options.dragPosition === 'before') {
                            orders.splice(i, 0, options.draggedId)
                        } else if (options.dragPosition === 'after') {
                            orders.splice(i + 1, 0, options.draggedId)
                        }
                        break
                    }
                }
            } else {
                // dragged req is not in folder
                let reqs = _.remove(collection.requests, (req) => {
                    return req.id === options.draggedId
                })
                let draggedReq = reqs[0]
                for (let i = 0, l = collection.requests.length; i < l; i++) {
                    if (collection.requests[i].id === options.droppedId) {
                        if (options.dragPosition === 'before') {
                            collection.requests.splice(i, 0, draggedReq)
                        } else if (options.dragPosition === 'after') {
                            collection.requests.splice(i + 1, 0, draggedReq)
                        }
                        break
                    }
                }
            }
        }
        StorageArea.get(['collections'], (result) => {
            let collections = result.collections
            dealData(collectionsData)
            dealData(collections)
            StorageArea.set({
                collections: collections
            }, callback)
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

    changeActiveReqId(reqId) {
        actions.changeActiveReqId(reqId)
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

        case AppConstants.SIDE_TAB_GET_COLLECTIONS:
            actions.getCollections(() => {
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

        case AppConstants.SIDE_IMPORT_COLLECTION:
            actions.importCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_CLEAR_LOCAL_STORAGE:
            actions.clearLocalStorage(() => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_EDIT_COLLECTION:
            actions.editCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_SYNC_COLLECTION:
            actions.syncCollection(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_RUN_COLLECTION:
            actions.runCollection(action.options, () => {
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

        case AppConstants.SIDE_MOVE_REQUEST:
            actions.moveRequest(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_DELETE_REQUEST:
            actions.deleteRequest(action.options, () => {
                SideTabStore.emitChange()
            })
            break

        case AppConstants.SIDE_SET_LOADING_TIP:
            actions.setLoadingTip(action.data)
            SideTabStore.emitChange()
            break

        case AppConstants.SIDE_DRAG_REQ:
            actions.dragReq(action.data, () => {
                SideTabStore.emitChange()
            })
            break

        default:
            break
    }

})

export default SideTabStore
