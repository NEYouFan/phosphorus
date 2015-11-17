//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import async from 'async'
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
    isDirty: false // it's user-input-data is saved or not
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
                    if (data[value.requiredField]) {
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
            savedData.res_checker_data = null
        } else {
            let refineData = (data) => {
                return data.value.map((item) => {
                    return {
                        key: item.key,
                        checked: item.checked,
                        value: refineData(item),
                        'value_type': item.valueType
                    }
                })
            }
            savedData.res_checker_data.forEach((item) => {
                item.value = refineData(item)
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

    deleteTabData(req, callback) {
        if (!req || !req.id) {
            return callback()
        }
        StorageArea.get('requests', (result) => {
            let requests = result.requests || {}
            delete requests[req.id]
            StorageArea.set({requests: requests}, () => {
                callback()
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

    deleteTabData(req, callback) {
        actions.deleteTabData(req, callback)
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
