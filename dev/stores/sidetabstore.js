//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import _ from 'lodash'
import Util from '../libs/util'
import StorageArea from '../libs/storagearea'
import Requester from '../components/requester/requester'

const CHANGE_EVENT = 'change'

let tabs = {
    activeTabName: 'Collections'
}

//let NEI_SERVER_URL = 'http://nei.hz.netease.com'
let NEI_SERVER_URL = 'http://127.0.0.1'
let historyData = null
let collectionsData = null
let collectionActionMenus = ['Edit host']
let collectionFolderActionMenus = ['Edit host']

let actions = {

    changeIndex(activeTabName) {
        tabs.activeTabName = activeTabName
    },

    fetchCollections(callback) {
        // already fetched
        if (collectionsData !== null) return
        //StorageArea.clear()
        //return
        StorageArea.get('hosts', (data) => {
            console.log(data)
            let hosts = data.hosts || {}
            hosts.collections = hosts.collections || {}
            hosts.folders = hosts.folders || {}
            Util.fetchNEICollections(NEI_SERVER_URL, hosts, (collections, res) => {
                collectionsData = collections
                callback()
            })
        })
    },

    changeCollHost(collection, host) {
        let result = _.find(collectionsData, (c) => {
            return c.id = collection.id
        })
        result.host = host
        StorageArea.get('hosts', (data) => {
            let hosts = data.hosts || {}
            hosts.collections = hosts.collections || {}
            hosts.collections[collection.neiId] = host
            StorageArea.set({'hosts': hosts})
        })
    },

    changeFolderHost(folder, host) {
        let collection = _.find(collectionsData, (c) => {
            return c.id == folder.collectionId
        })
        let result = _.find(collection.folders, (f) => {
            return f.id == folder.id
        })
        result.host = host
        StorageArea.get('hosts', (data) => {
            let hosts = data.hosts || {}
            hosts.folders = hosts.folders || {}
            hosts.folders[folder.neiId] = host
            StorageArea.set({'hosts': hosts})
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
            actions.changeCollHost(action.collection, action.host)
            SideTabStore.emitChange()
            break

        case AppConstants.SIDE_CHANGE_FOLDER_HOST:
            actions.changeFolderHost(action.folder, action.host)
            SideTabStore.emitChange()
            break

        default:
            break
    }

})

export default SideTabStore
