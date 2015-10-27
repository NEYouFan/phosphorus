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
const DEFAULT_CON_ITEM = {
    paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)],
    activeBuilderIndex: DEFAULT_ACTIVE_INDEX,
    showKV: true
}
const BODY_BUILDER_INDEX = 1

let tabCons = {
    activeIndex: DEFAULT_ACTIVE_INDEX,
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    showReqMethodsDropdown: false,
    items: [{
        paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)],
        builders: {
            items: [
                {
                    name: 'Headers(0)',
                    disabled: false
                },
                {
                    name: 'Body',
                    disabled: true
                }
            ],
            activeIndex: DEFAULT_ACTIVE_INDEX
        },
        showKV: true
    }]
}

let actions = {
    changeIndex(activeIndex) {
        tabCons.activeIndex = activeIndex
    },

    addCon() {
        tabCons.items.push({
            paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)],
            activeBuilderIndex: DEFAULT_ACTIVE_INDEX,
            showKV: true
        })
    },

    removeCon(tabIndex) {
        tabCons.items.splice(tabIndex, 1)
    },

    toggleReqMethodsDD() {
        tabCons.showReqMethodsDropdown = !tabCons.showReqMethodsDropdown
    },

    changeMethod(tabIndex) {
        let tab = ReqTabStore.getTab(tabIndex)
        let builders = tabCons.items[tabIndex].builders
        builders.items[BODY_BUILDER_INDEX].disabled = tab.method.toLowerCase() === 'get'
        if (builders.activeIndex === BODY_BUILDER_INDEX) {
            builders.activeIndex = DEFAULT_ACTIVE_INDEX
        }
    },

    toggleKV(tabIndex) {
        tabCons.items[tabIndex].showKV = !tabCons.items[tabIndex].showKV
    },

    toggleCheckParam(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].paramsKVs[rowIndex]
        if (kv.pathVariable) return
        kv.checked = !tabCons.items[tabIndex].paramsKVs[rowIndex].checked
        this.updateUrl(tabIndex)
    },

    addParamsKVRow(tabIndex) {
        tabCons.items[tabIndex].paramsKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeParamsKVRow(tabIndex, rowIndex) {
        tabCons.items[tabIndex].paramsKVs.splice(rowIndex, 1)
        this.updateUrl(tabIndex)
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
        let params = tabCons.items[tabIndex].paramsKVs
        params.forEach((param, index) => {
            if (index === rowIndex) {
                param[type] = value
            }
        })
        this.updateUrl(tabIndex)
    },

    updateUrl(tabIndex) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = tabCons.items[tabIndex].paramsKVs
        let newUrl = Util.setUrlQuery(tabUrl, params)
        ReqTabStore.setTabUrl(tabIndex, newUrl)
    },

    switchBuilderTab(tabIndex, activeIndex) {
        tabCons.items[tabIndex].builders.activeIndex = activeIndex
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

    getActiveBuilderIndex() {
        return tabCons.activeBuilderIndex
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

        case AppConstants.REQ_TAB_CONTENT_TOGGLE_METHODS_DD:
            actions.toggleReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_CHANGE_METHOD:
            actions.changeMethod(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_TOGGLE_KV:
            actions.toggleKV(action.tabIndex)
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

        case AppConstants.REQ_TAB_CONTENT_SWITCH_BUILDER_TAB:
            actions.switchBuilderTab(action.tabIndex, action.activeIndex)
            ReqTabConStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabConStore
