//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
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
let collectionActionMenus = ['Edit host', 'Add folder', 'Delete']
let collectionFolderActionMenus = ['Edit host', 'Delete']

let actions = {

    changeIndex(activeTabName) {
        tabs.activeTabName = activeTabName
    },

    fetchCollections(callback) {
        // already fetched
        if (collectionsData !== null) return
        //StorageArea.clear()
        //return
        StorageArea.get(['hosts', 'collections'], (result) => {
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
            collection.folders.push(item)// update ui

            let savedCollection = _.find(savedCollections, (c) => {
                return c.id === options.collection.id
            })
            savedCollection.folders = collection.folders
            // update storage
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
                    folder: collectionFolderActionMenus
                }
            }
        }
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

        default:
            break
    }

})

export default SideTabStore
