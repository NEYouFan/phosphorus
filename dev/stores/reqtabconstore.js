//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import ReqTabStore from './reqtabstore'
import Util from '../lib/util'

const CHANGE_EVENT = 'change'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_KEY_PLACEHOLDER = 'URL Parameter Key'
const DEFAULT_VALUE_PLACEHOLDER = 'Value'
const BLANK_STR = ''
const DEFAULT_PARAMS_KV = {
    keyPlaceholder: DEFAULT_KEY_PLACEHOLDER,
    valuePlaceholder: DEFAULT_VALUE_PLACEHOLDER,
    checked: true,
    key: BLANK_STR,
    value: BLANK_STR
}

let tabCons = {
    activeIndex: DEFAULT_ACTIVE_INDEX,
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    showReqMethodsDropdown: false,
    items: [{
        paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)],
        tabUrl: BLANK_STR
    }]
}

let actions = {
    changeIndex(activeIndex) {
        tabCons.activeIndex = activeIndex
    },

    addCon() {
        tabCons.items.push({
            paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)]
        })
    },

    removeCon(tabIndex) {
        tabCons.items.splice(tabIndex, 1)
    },

    hideReqMethodsDD() {
        tabCons.showReqMethodsDropdown = false
    },

    showReqMethodsDD() {
        tabCons.showReqMethodsDropdown = true
    },

    toggleCheckParam(tabIndex, rowIndex) {
        tabCons.items[tabIndex].paramsKVs[rowIndex].checked = !tabCons.items[tabIndex].paramsKVs[rowIndex].checked
    },

    addParamsKVRow(tabIndex) {
        tabCons.items[tabIndex].paramsKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeParamsKVRow(tabIndex, rowIndex) {
        tabCons.items[tabIndex].paramsKVs.splice(rowIndex, 1)
    },

    fillParams(tabIndex) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = Util.getUrlParams(tabUrl)
        params = params.map((param, index) => {
            return Object.assign({}, DEFAULT_PARAMS_KV, param)
        })
        params.push(Object.assign({}, DEFAULT_PARAMS_KV))
        tabCons.items[tabIndex].paramsKVs = params
    },

    changeKey (tabIndex, rowIndex, value) {
        this.changeKV(tabIndex, rowIndex, value, 'key')
    },

    changeValue (tabIndex, rowIndex, value) {
        this.changeKV(tabIndex, rowIndex, value, 'value')
    },

    changeKV(tabIndex, rowIndex, value, type) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = tabCons.items[tabIndex].paramsKVs
        params.forEach((param, index) => {
            if (index === rowIndex) {
                param[type] = value
            }
        })
        let newUrl = Util.setUrlQuery(tabUrl, params)
        ReqTabStore.setTabUrl(tabIndex, newUrl)
    }
}


let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCons: {
                reqCons: tabCons.items,
                reqMethods: tabCons.reqMethods,
                showReqMethodsDropdown: tabCons.showReqMethodsDropdown
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
        case AppConstants.REQ_TAB_CONTENT_CHANGE_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_ADD:
            actions.addCon()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_REMOVE:
            actions.removeCon(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_SHOW_METHODS_DD:
            actions.showReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_HIDE_METHODS_DD:
            actions.hideReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_TOGGLE_CHECK_PARAM:
            actions.toggleCheckParam(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_ADD_PARAMS_KV_ROW:
            actions.addParamsKVRow(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_REMOVE_PARAMS_KV_ROW:
            actions.removeParamsKVRow(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_FILL_PARAMS:
            actions.fillParams(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_CHANGE_KEY:
            actions.changeKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_CHANGE_VALUE:
            actions.changeValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabConStore
