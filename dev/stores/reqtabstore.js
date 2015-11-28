//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import async from 'async'
import Util from '../libs/util'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import RequestDataMap from '../libs/request_data_map'
import ReqTabConStore from './reqtabconstore'
import SideTabStore from './sidetabstore'
import StorageArea from '../libs/storagearea'

const CHANGE_EVENT = 'change'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_ITEMS = {
    id: '', // it's id
    url: '',
    rurl: '',// rurl is the request url, it's path variables are replaced(done in tabConActions.checkReqSend(), see@reqtabconstore.js )
    method: 'POST',
    name: '',
    urlError: false, // when click `save` button, if url is blank, then show error style
    isNEI: false, // nei tab, has some special logic, e.g.: it's url, method, url params and input params cannot be changed
    isDirty: false, // it's user-input-data is saved or not
    folderId: null,
    collectionId: null
}

let tabs = {
    items: [Object.assign({}, DEFAULT_ITEMS)],
    activeIndex: DEFAULT_ACTIVE_INDEX
}

let actions = {
    changeIndex(activeIndex) {
        tabs.activeIndex = activeIndex
        // change active request id
        let activeTab = tabs.items[activeIndex]
        SideTabStore.changeActiveReqId(activeTab.id)
    },

    addTab() {
        tabs.items.push(Object.assign({}, DEFAULT_ITEMS))
    },

    removeTab(tabIndex) {
        tabs.items.splice(tabIndex, 1)
    },

    removeTabById(tabId, callback) {
        if (!tabId) {
            return callback()
        }
        let tabIndex = null
        _.remove(tabs.items, (tab, index) => {
            if (tab.id === tabId) {
                tabIndex = index
                ReqTabConStore.removeCon(tabIndex)
                return true
            }
        })
        if (tabIndex === null) {
            // tab is not opened
            return callback()
        }
        let isActive = tabs.activeIndex === tabIndex
        if (tabs.items.length === 0) {
            this.addTab()
            ReqTabConStore.addCon()
        }
        let nextActiveIndex = Util.getNextActiveIndex(isActive, tabIndex, tabs.activeIndex)
        this.changeIndex(nextActiveIndex)
        callback(tabIndex)
    },

    removeCollectionTabs(collectionId, callback) {
        let isActive
        let hit
        _.remove(tabs.items, (tab, index) => {
            if (tab.collectionId === collectionId) {
                hit = true
                if (!isActive) {
                    isActive = tabs.activeIndex === index
                }
                // remove tab content
                ReqTabConStore.removeCon(index)
                return true
            }
        })
        if (!hit) {
            return callback()
        }
        if (tabs.items.length === 0) {
            this.addTab()
            ReqTabConStore.addCon()
        }
        let nextActiveIndex = Util.getNextActiveIndex(isActive, 0, tabs.activeIndex)
        this.changeIndex(nextActiveIndex)
        callback()
    },

    changeTab(tab) {
        tabs.items[tabs.activeIndex] = Object.assign(tabs.items[tabs.activeIndex], tab)
    },

    setDirtyTab() {
        let tab = tabs.items[tabs.activeIndex]
        // if tab has no url, it can't be saved
        if (!tab.url) return
        tab.isDirty = true
    },

    saveTabToLocal(callback) {
        let tab = tabs.items[tabs.activeIndex]
        // just for save check
        if (!tab.url) {
            return callback()
        }
        let tabCon = ReqTabConStore.getCurrentCon().builders
        let savedData = {}
        _.each(RequestDataMap, (value, key) => {
            let data = tab[key] || tabCon[key]
            if (typeof value === 'object') {
                if (Array.isArray(data)) {
                    savedData[value.saveKey] = []
                    _.each(data, (item) => {
                        if (item[value.requiredField]) {
                            let sItem = {}
                            _.each(value.fields, (v, k) => {
                                sItem[v] = item[k]
                            })
                            savedData[value.saveKey].push(sItem)
                        }
                    })
                } else {
                    if (data && data[value.requiredField]) {
                        let sItem = {}
                        _.each(value.fields, (v, k) => {
                            sItem[v] = data[k]
                        })
                        savedData[value.saveKey] = sItem
                    }
                }
            } else {
                savedData[value] = data
            }
        })
        // refine `res_checker_data`
        if (savedData['is_nei']) {
            delete savedData.res_checker_data
            delete savedData.headers
        } else {
            if (Array.isArray(savedData['res_checker_data'])) {
                let refineResCheckerData = (data) => {
                    return data.values.map((item) => {
                        return {
                            key: item.key,
                            checked: item.checked,
                            values: refineResCheckerData(item),
                            value_type: item.valueType,
                            childValueType: item.childValueType,
                            type_changeable: item.typeChangeable,
                            child_type_changeable: item.childTypeChangeable
                        }
                    })
                }
                savedData['res_checker_data'].forEach((item) => {
                    item.values = refineResCheckerData(item)
                })
            }
        }
        if (Array.isArray(savedData['body_raw_json'])) {
            // refine `body_raw_json`
            let refineBodyRawJSONData = (data) => {
                return data.values.map((item) => {
                    return {
                        key: item.key,
                        value: item.value,
                        checked: item.checked,
                        values: refineBodyRawJSONData(item),
                        value_type: item.valueType,
                        value_readonly: item.valueReadonly,
                        child_value_type: item.childValueType,
                        key_visible: item.keyVisible,
                        type_changeable: item.typeChangeable
                    }
                })
            }
            savedData['body_raw_json'].forEach((item) => {
                item.values = refineBodyRawJSONData(item)
            })
        }
        // save to local storage
        console.log(savedData)
        // already have id, directly save it
        StorageArea.get('requests', (result) => {
            let requests = result.requests || {}
            requests[savedData.id] = savedData
            StorageArea.set({requests: requests}, () => {
                tab.isDirty = false
                callback(savedData)
            })
        })
    },

    updateTabName(tabId, name) {
        let tab = _.find(tabs.items, (tab) => {
            return tab.id === tabId
        })
        if (tab) {
            tab.name = name
        }
    }
}

let ReqTabStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTab: {
                tabs: tabs.items,
                activeIndex: tabs.activeIndex
            }
        }
    },

    getActiveIndex() {
        return tabs.activeIndex
    },

    getTab(tabIndex) {
        return tabs.items[tabIndex]
    },

    getActiveTab() {
        return tabs.items[tabs.activeIndex]
    },

    getTabUrl(tabIndex) {
        return tabs.items[tabIndex].url
    },

    setTabUrl(tabIndex, tabUrl) {
        let tab = tabs.items[tabIndex]
        tab.url = tabUrl
    },

    changeTab(tab) {
        actions.changeTab(tab)
    },

    saveTabToLocal(callback) {
        actions.saveTabToLocal(callback)
    },

    updateTabName(tabId, name) {
        actions.updateTabName(tabId, name)
    },

    removeTabById(tabId, callback) {
        actions.removeTabById(tabId, callback)
    },

    removeCollectionTabs(collectionId, callback) {
        actions.removeCollectionTabs(collectionId, callback)
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
        case AppConstants.REQ_TAB_CHANGE_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_ADD:
            actions.addTab()
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_REMOVE:
            actions.removeTab(action.tabIndex)
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_CHANGE:
            actions.changeTab(action.tab)
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_SET_DIRTY:
            actions.setDirtyTab()
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_SAVE:
            async.waterfall([
                (cb) => {
                    actions.saveTabToLocal((savedData) => {
                        cb(null, savedData)
                    })
                },
                (savedData, cb) => {
                    SideTabStore.updateActiveReq({
                        path: savedData.url,
                        method: savedData.method,
                        id: savedData.id
                    }, cb)
                }
            ], (err) => {
                ReqTabStore.emitChange()
            })
            break

        default:
            break
    }

})

export default ReqTabStore
