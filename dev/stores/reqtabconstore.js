//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import ReqTabStore from './reqtabstore'
import Util from '../libs/util'

const CHANGE_EVENT = 'change'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_KEY_PLACEHOLDER = 'Key'
const DEFAULT_VALUE_PLACEHOLDER = 'Value'
const BLANK_STR = ''
const DEFAULT_KV = {
    keyPlaceholder: DEFAULT_KEY_PLACEHOLDER,
    valuePlaceholder: DEFAULT_VALUE_PLACEHOLDER,
    checked: true,
    key: BLANK_STR,
    value: BLANK_STR,
    keyDataList: '',
    valueDataList: ''
}
const DEFAULT_HEADERS_KV = Object.assign({}, DEFAULT_KV, {
    keyDataList: 'reqheadersdatalist'
})
const DEFAULT_PARAMS_KV = Object.assign({}, DEFAULT_KV, {
    keyPlaceholder: 'URL Parameter Key'
})
const DEFAULT_BODY_FORMDATA_KV = Object.assign({}, DEFAULT_KV, {
    valueType: 'text'
})
const DEFAULT_BODY_XFORM_KV = Object.assign({}, DEFAULT_KV)

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
            },
            {
                name: 'Response Checker',
                disabled: false
            }
        ],
        activeIndex: 1,
        headerKVs: [DEFAULT_HEADERS_KV],
        bodyType: {
            name: 'form-data',
            value: 'Text'
        },
        bodyFormDataKVs: [DEFAULT_BODY_FORMDATA_KV],
        bodyXFormKVs: [DEFAULT_BODY_XFORM_KV]
    },
    showParamKV: true,
    showBodyRawTypeList: false,
    showReqMethodList: false
}
const BODY_BUILDER_INDEX = 1

let tabCons = {
    bodyTypes: ['form-data', 'x-www-form-urlencoded', 'binary', 'raw'],
    rawTypes: ['Text', 'Text(text/plain)', 'JSON(application/json)', 'Javascript(application/javascript)', 'XML(application/xml)', 'XML(text/xml)', 'HTML(text/html)'],
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINKS', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
    items: [_.cloneDeep(DEFAULT_CON_ITEM)]
}

let tabConActions = {

    addCon() {
        tabCons.items.push(_.cloneDeep(DEFAULT_CON_ITEM))
    },

    removeCon(tabIndex) {
        tabCons.items.splice(tabIndex, 1)
    },

    toggleReqMethodsList(tabIndex) {
        tabCons.items[tabIndex].showReqMethodList = !tabCons.items[tabIndex].showReqMethodList
    },

    changeMethod(tabIndex) {
        let tab = ReqTabStore.getTab(tabIndex)
        let isGetMethod = tab.method.toLowerCase() === 'get'
        let builders = tabCons.items[tabIndex].builders
        builders.items[BODY_BUILDER_INDEX].disabled = isGetMethod
        if (isGetMethod && builders.activeIndex === BODY_BUILDER_INDEX) {
            builders.activeIndex = DEFAULT_ACTIVE_INDEX
        }
    },

    toggleParams(tabIndex) {
        tabCons.items[tabIndex].showParamKV = !tabCons.items[tabIndex].showParamKV
    },

    switchBuilderTab(tabIndex, activeIndex) {
        tabCons.items[tabIndex].builders.activeIndex = activeIndex
    }
}

let paramActions = {

    fillParams(tabIndex) {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = Util.getUrlParams(tabUrl)
        params = params.map((param) => {
            return Object.assign({}, DEFAULT_PARAMS_KV, param)
        })
        params.push(Object.assign({}, DEFAULT_PARAMS_KV))
        tabCons.items[tabIndex].paramKVs = params
    },

    toggleParamKV(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].paramKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].paramKVs[rowIndex].checked
        this.updateTabUrl(tabIndex)
    },

    addParamKV(tabIndex) {
        tabCons.items[tabIndex].paramKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeParamKV(tabIndex, rowIndex) {
        tabCons.items[tabIndex].paramKVs.splice(rowIndex, 1)
        this.updateTabUrl(tabIndex)
    },

    changeParamKVKey (tabIndex, rowIndex, value) {
        this.changeParam(tabIndex, rowIndex, value, 'key')
    },

    changeParamKVValue (tabIndex, rowIndex, value) {
        this.changeParam(tabIndex, rowIndex, value, 'value')
    },

    changeParam(tabIndex, rowIndex, value, type) {
        let param = tabCons.items[tabIndex].paramKVs[rowIndex]
        param[type] = value
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

    toggleHeaderKV(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].builders.headerKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.headerKVs[rowIndex].checked
    },

    addHeaderKV(tabIndex) {
        tabCons.items[tabIndex].builders.headerKVs.push(Object.assign({}, DEFAULT_HEADERS_KV))
    },

    removeHeaderKV(tabIndex, rowIndex) {
        tabCons.items[tabIndex].builders.headerKVs.splice(rowIndex, 1)
    },

    changeHeaderKVKey(tabIndex, rowIndex, value) {
        this.changeHeader(tabIndex, rowIndex, value, 'key')
    },

    changeHeaderKVValue(tabIndex, rowIndex, value) {
        this.changeHeader(tabIndex, rowIndex, value, 'value')
    },

    changeHeader(tabIndex, rowIndex, value, type) {
        let header = tabCons.items[tabIndex].builders.headerKVs[rowIndex]
        header[type] = value
        if (type === 'key' && header['keyDataList']) {
            if (value.toLowerCase() === 'content-type') {
                header.valueDataList = 'mediatypsdatalist'
            } else {
                header.valueDataList = ''
            }
        }
    }
}

let bodyActions = {
    changeBodyType(tabIndex, bodyType) {
        tabCons.items[tabIndex].builders.bodyType.name = bodyType
    },

    changeBodyTypeValue(tabIndex, bodyTypeValue) {
        tabCons.items[tabIndex].builders.bodyType.value = bodyTypeValue
    },

    toggleBodyTypeList(tabIndex) {
        tabCons.items[tabIndex].showBodyRawTypeList = !tabCons.items[tabIndex].showBodyRawTypeList
    },

    // body form data kv action
    toggleBodyFormDataKV(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex].checked
    },

    addBodyFormDataKV(tabIndex) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs.push(Object.assign({}, DEFAULT_BODY_FORMDATA_KV))
    },

    removeBodyFormDataKV(tabIndex, rowIndex) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs.splice(rowIndex, 1)
    },

    changeBodyFormDataKVKey(tabIndex, rowIndex, value) {
        this.changeBodyFormData(tabIndex, rowIndex, value, 'key')
    },

    changeBodyFormDataKVValue(tabIndex, rowIndex, value) {
        this.changeBodyFormData(tabIndex, rowIndex, value, 'value')
    },

    changeBodyFormData(tabIndex, rowIndex, value, type) {
        let kv = tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex]
        kv[type] = value
    },

    changeBodyFormDataKVValueType(tabIndex, rowIndex, value) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex].valueType = value
    },

    // body x form kv action
    toggleBodyXFormKV(tabIndex, rowIndex) {
        let kv = tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex].checked
    },

    addBodyXFormKV(tabIndex) {
        tabCons.items[tabIndex].builders.bodyXFormKVs.push(Object.assign({}, DEFAULT_BODY_XFORM_KV))
    },

    removeBodyXFormKV(tabIndex, rowIndex) {
        tabCons.items[tabIndex].builders.bodyXFormKVs.splice(rowIndex, 1)
    },

    changeBodyXFormKVKey(tabIndex, rowIndex, value) {
        this.changeBodyFormData(tabIndex, rowIndex, value, 'key')
    },

    changeBodyXFormKVValue(tabIndex, rowIndex, value) {
        this.changeBodyFormData(tabIndex, rowIndex, value, 'value')
    },

    changeBodyXForm(tabIndex, rowIndex, value, type) {
        let kv = tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex]
        kv[type] = value
    }

}

let actions = Object.assign({}, tabConActions, paramActions, headerActions, bodyActions)

let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCon: {
                reqCons: tabCons.items,
                reqMethods: tabCons.reqMethods,
                bodyTypes: tabCons.bodyTypes,
                rawTypes: tabCons.rawTypes
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
        case AppConstants.REQ_CONTENT_ADD:
            actions.addCon()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_REMOVE:
            actions.removeCon(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_TOGGLE_METHODS_LIST:
            actions.toggleReqMethodsList(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_CHANGE_METHOD:
            actions.changeMethod(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_TOGGLE_PARAMS:
            actions.toggleParams(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_FILL_PARAMS:
            actions.fillParams(action.tabIndex)
            ReqTabConStore.emitChange()
            break
        // req content action <---


        // req param action --->
        case AppConstants.REQ_PARAM_TOGGLE_KV:
            actions.toggleParamKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_ADD_KV:
            actions.addParamKV(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_REMOVE_KV:
            actions.removeParamKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_CHANGE_KV_KEY:
            actions.changeParamKVKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_PARAM_CHANGE_KV_VALUE:
            actions.changeParamKVValue(action.tabIndex, action.rowIndex, action.value)
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
        case AppConstants.REQ_HEADER_TOGGLE_KV:
            actions.toggleHeaderKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_ADD_KV:
            actions.addHeaderKV(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_REMOVE_KV:
            actions.removeHeaderKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_KV_KEY:
            actions.changeHeaderKVKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_KV_VALUE:
            actions.changeHeaderKVValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req header action <---


        // req body action --->
        case AppConstants.REQ_BODY_CHANGE_TYPE:
            actions.changeBodyType(action.tabIndex, action.bodyType)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_CHANGE_TYPE_VALUE:
            actions.changeBodyTypeValue(action.tabIndex, action.bodyTypeValue)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_TOGGLE_TYPE_LIST:
            actions.toggleBodyTypeList(action.tabIndex)
            ReqTabConStore.emitChange()
            break
        // body form data kv action
        case AppConstants.REQ_BODY_FORMDATA_TOGGLE_KV:
            actions.toggleBodyFormDataKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_ADD_KV:
            actions.addBodyFormDataKV(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_REMOVE_KV:
            actions.removeBodyFormDataKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_KEY:
            actions.changeBodyFormDataKVKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE:
            actions.changeBodyFormDataKVValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE:
            actions.changeBodyFormDataKVValueType(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        //body x form kv action
        case AppConstants.REQ_BODY_XFORM_TOGGLE_KV:
            actions.toggleBodyXFormKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_ADD_KV:
            actions.addBodyXFormKV(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_REMOVE_KV:
            actions.removeBodyXFormKV(action.tabIndex, action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_CHANGE_KV_KEY:
            actions.changeBodyXFormKVKey(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_CHANGE_KV_VALUE:
            actions.changeBodyXFormKVValue(action.tabIndex, action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req body action <---

        default:
            break
    }

})

export default ReqTabConStore
