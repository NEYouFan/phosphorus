//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import URL from 'url'

const CHANGE_EVENT = 'change'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_KEY_PLACEHOLDER = 'URL Parameter Key'
const DEFAULT_VALUE_PLACEHOLDER = 'Value'
const DEFAULT_PARAMS_KV = {
    keyPlaceholder: DEFAULT_KEY_PLACEHOLDER,
    valuePlaceholder: DEFAULT_VALUE_PLACEHOLDER
}

let tabCons = {
    activeIndex: DEFAULT_ACTIVE_INDEX,
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    showReqMethodsDropdown: false,
    paramsKVs: [Object.assign({}, DEFAULT_PARAMS_KV)]
}

let actions = {
    changeIndex(activeIndex) {
        tabCons.activeIndex = activeIndex
    },

    hideReqMethodsDD() {
        tabCons.showReqMethodsDropdown = false
    },

    showReqMethodsDD() {
        tabCons.showReqMethodsDropdown = true
    },

    addParamsKVRow() {
        tabCons.paramsKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeParamsKVRow(rowIndex) {
        tabCons.paramsKVs.splice(rowIndex, 1)
    },

    fillParams(tabUrl, tabIndex) {
        let result = URL.parse(tabUrl)
        console.log(result)
    }
}


let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCons: {
                reqCons: tabCons.items,
                reqMethods: tabCons.reqMethods,
                showReqMethodsDropdown: tabCons.showReqMethodsDropdown,
                paramsKVs: tabCons.paramsKVs
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

        case AppConstants.REQ_TAB_CONTENT_SHOW_METHODS_DD:
            actions.showReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_HIDE_METHODS_DD:
            actions.hideReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_ADD_PARAMS_KV_ROW:
            actions.addParamsKVRow()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_REMOVE_PARAMS_KV_ROW:
            actions.removeParamsKVRow(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_FILL_PARAMS:
            actions.fillParams(action.tabUrl, action.tabIndex)
            ReqTabConStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabConStore
