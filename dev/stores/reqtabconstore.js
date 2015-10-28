//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import ReqTabStore from './reqtabstore'
import Util from '../lib/util'

const CHANGE_EVENT = 'change'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_KEY_PLACEHOLDER = 'Key'
const DEFAULT_VALUE_PLACEHOLDER = 'Value'
const BLANK_STR = ''
const DEFAULT_HEADERS_KV = {
    keyPlaceholder: DEFAULT_KEY_PLACEHOLDER,
    valuePlaceholder: DEFAULT_VALUE_PLACEHOLDER,
    checked: true,
    key: BLANK_STR,
    value: BLANK_STR
}
const DEFAULT_PARAMS_KV = Object.assign({}, DEFAULT_HEADERS_KV, {
    keyPlaceholder: 'URL Parameter Key'
})

const DEFAULT_CON_ITEM = {
    paramKVs: [DEFAULT_PARAMS_KV],
    builders: {
        items: [
            {
                name: 'Headers',
                disabled: false
            },
            {
                name: 'Body',
                disabled: false
            }
        ],
        activeIndex: DEFAULT_ACTIVE_INDEX,
        headerKVs: [DEFAULT_HEADERS_KV]
    },
    showKV: true
}
const BODY_BUILDER_INDEX = 1

let tabCons = {
    activeIndex: DEFAULT_ACTIVE_INDEX,
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINKS', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
    showReqMethodsDropdown: false,
    items: [_.cloneDeep(DEFAULT_CON_ITEM)]
}

let tabConActions = {
    changeIndex(activeIndex) {
        tabCons.activeIndex = activeIndex
    },

    addCon() {
        tabCons.items.push(_.cloneDeep(DEFAULT_CON_ITEM))
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

    toggleParamsKV(tabIndex) {
        tabCons.items[tabIndex].showKV = !tabCons.items[tabIndex].showKV
    },

    switchBuilderTab(tabIndex, activeIndex) {
        tabCons.items[tabIndex].builders.activeIndex = activeIndex
    }
}

let paramActions = {

    toggleCheckParam(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].paramKVs[rowIndex]
        if (kv.pathVariable) return
        kv.checked = !tabCons.items[tabIndex].paramKVs[rowIndex].checked
        this.updateTabUrl(tabIndex)
    },

    addParamRow(tabIndex) {
        tabCons.items[tabIndex].paramKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeParamRow(tabIndex, rowIndex) {
        tabCons.items[tabIndex].paramKVs.splice(rowIndex, 1)
        this.updateTabUrl(tabIndex)
    },

    fillParams(tabIndex) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = Util.getUrlParams(tabUrl)
        params = params.map((param) => {
            return Object.assign({}, DEFAULT_PARAMS_KV, param)
        })
        params.push(Object.assign({}, DEFAULT_PARAMS_KV))
        tabCons.items[tabIndex].paramKVs = params
    },

    changeParamKey (tabIndex, rowIndex, value) {
        this.changeParam(tabIndex, rowIndex, value, 'key')
    },

    changeParamValue (tabIndex, rowIndex, value) {
        this.changeParam(tabIndex, rowIndex, value, 'value')
    },

    changeParam(tabIndex, rowIndex, value, type) {
        let params = tabCons.items[tabIndex].paramKVs
        params.forEach((param, index) => {
            if (index === rowIndex) {
                param[type] = value
            }
        })
        this.updateTabUrl(tabIndex)
    },

    updateTabUrl(tabIndex) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = tabCons.items[tabIndex].paramKVs
        let newUrl = Util.setUrlQuery(tabUrl, params)
        ReqTabStore.setTabUrl(tabIndex, newUrl)
    }
}

let headerActions = {

    toggleCheckHeader(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].builders.headerKVs[rowIndex]
        if (kv.pathVariable) return
        kv.checked = !tabCons.items[tabIndex].builders.headerKVs[rowIndex].checked
    },

    addHeaderRow(tabIndex) {
        tabCons.items[tabIndex].builders.headerKVs.push(Object.assign({}, DEFAULT_HEADERS_KV))
    },

    removeHeaderRow(tabIndex, rowIndex) {
        tabCons.items[tabIndex].builders.headerKVs.splice(rowIndex, 1)
    },

    changeHeaderKey (tabIndex, rowIndex, value) {
        this.changeHeader(tabIndex, rowIndex, value, 'key')
    },

    changeHeaderValue (tabIndex, rowIndex, value) {
        this.changeHeader(tabIndex, rowIndex, value, 'value')
    },

    changeHeader(tabIndex, rowIndex, value, type) {
        let headers = tabCons.items[tabIndex].builders.headerKVs
        headers.forEach((header, index) => {
            if (index === rowIndex) {
                header[type] = value
            }
        })
    }
}

let actions = Object.assign({}, tabConActions, paramActions, headerActions)


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
        // req content action --->
        case AppConstants.REQ_CONTENT_CHANGE_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_ADD:
            actions.addCon()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_REMOVE:
            actions.removeCon(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_TOGGLE_METHODS_DD:
            actions.toggleReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_CHANGE_METHOD:
            actions.changeMethod(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_TOGGLE_PARAMS:
            actions.toggleParamsKV(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_FILL_PARAMS:
            actions.fillParams(action.tabIndex)
            ReqTabConStore.emitChange()
            break
        // req content action <---

        // req param action --->
        case AppConstants.REQ_PARAM_TOGGLE_CHECK:
            actions.toggleCheckParam(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_ADD_ROW:
            actions.addParamRow(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_REMOVE_ROW:
            actions.removeParamRow(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_CHANGE_KEY:
            actions.changeParamKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_CHANGE_VALUE:
            actions.changeParamValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req param action <---

        // req builder action --->
        case AppConstants.REQ_BUILDER_SWITCH_TAB:
            actions.switchBuilderTab(action.tabIndex, action.activeIndex)
            ReqTabConStore.emitChange()
            break
        // req builder action <---

        // req header action --->
        case AppConstants.REQ_HEADER_TOGGLE_CHECK:
            actions.toggleCheckHeader(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_ADD_ROW:
            actions.addHeaderRow(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_REMOVE_ROW:
            actions.removeHeaderRow(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_KEY:
            actions.changeHeaderKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_VALUE:
            actions.changeHeaderValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req header action <---

        default:
            break
    }

})

export default ReqTabConStore
