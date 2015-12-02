//author @huntbao
'use strict'

import Events from 'events'
import _ from 'lodash'
import URL from 'url'
import Util from '../libs/util'
import StorageArea from '../libs/storagearea'
import RequestDataMap from '../libs/request_data_map'
import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import ReqTabStore from './reqtabstore'
import ReqTabAction from '../actions/reqtabaction'
import Requester from '../components/requester/requester'

const CHANGE_EVENT = 'change'
const ACE_EDITOR_UPDATE_EVENT = 'ace editor update'
const DEFAULT_ACTIVE_INDEX = 0
const DEFAULT_KEY_STR = 'Key'
const DEFAULT_VALUE_STR = 'Value'
const BLANK_STR = ''
const ARRAY_ITEM_PLACEHOLDER = '[[array item]]'
const REQ_HEADERS_DATA_LIST = 'reqheadersdatalist'
const REQ_MIDIATYPES_DATA_LIST = 'mediatypesdatalist'
const CONTENT_TYPE_STR = 'Content-Type'
const XFORM_CONTENT_TYPE = 'x-www-form-urlencoded'
const XFORM_CONTENT_TYPE_VALUE = 'application/x-www-form-urlencoded'
const REQUEST_BODY_STR = 'Request Body'
const URL_PARAMS_STR = 'URL Params'
const REQUEST_HEADERS_STR = 'Request Headers'
const RESPONSE_CHECKER_STR = 'Response Checker'
const RESPONSE_STR = 'Response'
const REQ_PREPARE = 0
const REQ_SENDING = 1
const REQ_SUCCEEDED = 2
const REQ_FAILED = 3
const DEFAULT_KV = {
    keyPlaceholder: DEFAULT_KEY_STR,
    valuePlaceholder: DEFAULT_VALUE_STR,
    checked: true,
    key: BLANK_STR,
    value: BLANK_STR,
    keyDataList: '',
    valueDataList: ''
}
const DEFAULT_HEADERS_KV = Object.assign({}, DEFAULT_KV, {
    keyPlaceholder: 'Header',
    keyDataList: REQ_HEADERS_DATA_LIST
})
const DEFAULT_JSON_HEADER_KV = Object.assign({}, DEFAULT_HEADERS_KV, {
    keyDataList: REQ_HEADERS_DATA_LIST,
    valueDataList: REQ_MIDIATYPES_DATA_LIST,
    key: 'Content-Type',
    value: 'application/json'
})
const DEFAULT_XFORM_HEADER_KV = Object.assign({}, DEFAULT_HEADERS_KV, {
    key: CONTENT_TYPE_STR,
    value: XFORM_CONTENT_TYPE_VALUE,
    valueDataList: REQ_MIDIATYPES_DATA_LIST
})
const DEFAULT_PARAMS_KV = Object.assign({}, DEFAULT_KV, {
    keyPlaceholder: 'URL Parameter Key'
})
const DEFAULT_BODY_FORMDATA_KV = Object.assign({}, DEFAULT_KV, {
    valueType: 'text',
    fileInput: null
})
const DEFAULT_BODY_RAW_JSON_KV = Object.assign({}, DEFAULT_KV, {
    valueType: 'string',
    childValueType: 'string',
    values: [],
    typeChangeable: true,
    valueReadonly: false,
    childTypeChangeable: true
})
const DEFAULT_BODY_XFORM_KV = Object.assign({}, DEFAULT_KV)
const DEFAULT_RES_CHECKER_KV = Object.assign({}, DEFAULT_KV, {
    valueType: 'string',
    childValueType: 'string',
    values: [],
    typeChangeable: true,
    childTypeChangeable: true
})
const DEFAULT_RES_SHOW_TYPE = {
    type: 'Pretty',
    prettyType: 'HTML'
}
const DEFAULT_CON_ITEM = {
    builders: {
        bodyTypes: [
            {
                type: 'x-www-form-urlencoded',
                disabled: false
            },
            {
                type: 'form-data',
                disabled: false
            },
            {
                type: 'binary',
                disabled: false
            },
            {
                type: 'raw',
                disabled: false
            }
        ],
        items: [
            {
                name: URL_PARAMS_STR,
                disabled: false
            },
            {
                name: REQUEST_BODY_STR,
                disabled: false
            },
            {
                name: REQUEST_HEADERS_STR,
                disabled: false
            },
            {
                name: RESPONSE_CHECKER_STR,
                disabled: false
            },
            {
                name: RESPONSE_STR,
                disabled: false
            }
        ],
        paramKVs: [DEFAULT_PARAMS_KV],
        activeTabName: REQUEST_BODY_STR,
        headerKVs: [DEFAULT_JSON_HEADER_KV, DEFAULT_HEADERS_KV],
        bodyType: {
            type: 'raw',
            name: 'JSON(application/json)',
            value: 'application/json',
            jsonType: 'object'
        },
        bodyFormDataKVs: [DEFAULT_BODY_FORMDATA_KV],
        bodyRawJSONKVs: [DEFAULT_BODY_RAW_JSON_KV],
        bodyXFormKVs: [DEFAULT_BODY_XFORM_KV],
        bodyBinaryFileInput: null,
        bodyRawData: null,
        bodyRawDataOriginal: null, // original body raw data, check if changes really happened
        reqStatus: REQ_PREPARE,
        fetchResponse: null,
        fetchResponseRawData: null,
        fetchResponseIsJSON: false,
        resShowType: Object.assign({}, DEFAULT_RES_SHOW_TYPE),
        resFilePath: null, // response local file path: preview iframe src
        resCheckerKVs: [DEFAULT_RES_CHECKER_KV],
        resCheckerResult: null,
        resJSONType: 'object'
    },
    showBodyRawTypeList: false,
    showBodyJSONTypeList: false,
    showResJSONTypeList: false,
    showReqMethodList: false,
    showResPrettyTypeList: false,
    aceEditorConfig: {
        show: false,
        mode: 'text',
        readOnly: false
    }
}

// current active tab index
let tabIndex = 0

let tabCons = {
    rawTypes: [
        {
            value: 'text',
            name: 'Text',
            editorConfig: {
                show: true,
                mode: 'text'
            }
        },
        {
            value: 'text/plain',
            name: 'Text(text/plain)',
            editorConfig: {
                show: true,
                mode: 'text'
            }
        },
        {
            value: 'application/json',
            name: 'JSON(application/json)',
            editorConfig: {
                show: false
            }
        },
        {
            value: 'application/javascript',
            name: 'Javascript(application/javascript)',
            editorConfig: {
                show: true,
                mode: 'javascript'
            }
        },
        {
            value: 'application/xml',
            name: 'XML(application/xml)',
            editorConfig: {
                show: true,
                mode: 'xml'
            }
        },
        {
            value: 'text/xml',
            name: 'XML(text/xml)',
            editorConfig: {
                show: true,
                mode: 'xml'
            }
        },
        {
            value: 'text/html',
            name: 'XML(text/html)',
            editorConfig: {
                show: true,
                mode: 'html'
            }
        }
    ],
    //reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'COPY', 'HEAD', 'OPTIONS', 'LINKS', 'UNLINK', 'PURGE', 'LOCK', 'UNLOCK', 'PROPFIND', 'VIEW'],
    reqMethods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'],
    prettyTypes: ['JSON', 'XML', 'HTML', 'Text'],
    jsonTypes: ['object', 'array', 'string', 'number', 'boolean'],
    items: [_.cloneDeep(DEFAULT_CON_ITEM)],
    aceEditorId: 'brace-editor'
}

let tabConActions = {

    addCon() {
        tabCons.items.push(_.cloneDeep(DEFAULT_CON_ITEM))
    },

    removeCon(tabIndex) {
        tabCons.items.splice(tabIndex, 1)
    },

    updateConByRequest(request, dataSource, callback) {
        console.log(request)
        console.log(dataSource)
        let newTabCon = _.cloneDeep(DEFAULT_CON_ITEM)
        StorageArea.get('requests', (result) => {
            let requests = result.requests || {}
            let savedRequest = requests[request.id]
            console.log(savedRequest)
            this.__dealRequest(request, dataSource, savedRequest, newTabCon)
            tabCons.items[tabIndex] = newTabCon
            // change editor mode by bodyType
            let rawType = _.find(tabCons.rawTypes, (rawType) => {
                return newTabCon.builders.bodyType.name === rawType.name
            })
            this.changeAceEditorConfig(rawType && rawType.editorMode)
            this.changeMethod()
            callback()
        })
    },

    __dealRequest(request, dataSource, savedRequest, newTabCon) {
        let builders = newTabCon.builders
        let tabUrl = request.path
        let dealUrlParams = (includeInputs) => {
            builders.paramKVs = []
            let urlParams = Util.getUrlParams(request.path)
            urlParams.forEach((urlParam) => {
                if (urlParam.isPV) {
                    builders.paramKVs.push(Object.assign({}, DEFAULT_PARAMS_KV, {
                        key: urlParam.key,
                        checked: true,
                        readonly: true,
                        isPV: true
                    }))
                }
            })
            if (includeInputs) {
                // url param kvs
                request.inputs.forEach((urlParam) => {
                    builders.paramKVs.push(Object.assign({}, DEFAULT_PARAMS_KV, {
                        key: urlParam.name,
                        title: urlParam.description,
                        checked: true
                    }))
                })
            }
            let savedURLParams = savedRequest && savedRequest[RequestDataMap.paramKVs.saveKey]
            // set saved url param value
            _.each(builders.paramKVs, (kv) => {
                let foundSavedPV
                if (kv.isPV) {
                    foundSavedPV = _.find(savedURLParams, (p) => {
                        return p.is_pv && p.key === kv.key
                    })
                } else if (includeInputs) {
                    foundSavedPV = _.find(savedURLParams, (p) => {
                        return !p.is_pv && p.key === kv.key
                    })
                }
                if (foundSavedPV) {
                    kv.value = foundSavedPV.value
                }
            })
            tabUrl = Util.getURLByQueryParams(request.path, builders.paramKVs)
        }
        if (request.isNEI) {
            builders.bodyTypes.forEach((bodyType) => {
                bodyType.disabled = true
            })
            builders.headerKVs = []
            savedRequest = savedRequest || {}
            // nei request special logic
            if (!Util.isNoBodyMethod(request.method)) {
                dealUrlParams(false)
                if (request.isRest) {
                    // rest header is default set, nei need not set this header
                    builders.headerKVs.push(Object.assign({}, DEFAULT_JSON_HEADER_KV, {
                        readonly: true,
                        valueReadonly: true,
                        keyDataList: null,
                        valueDataList: null,
                        title: 'Default RESTful request header'
                    }))
                    // restful request
                    builders.bodyType = {
                        type: 'raw',
                        name: 'JSON(application/json)',
                        value: 'application/json',
                        jsonType: Util.getNEIParamsInfo(request.inputs, dataSource).valueType
                    }
                    // init request inputs, build json kvs, saved data is `bodyRawJSONKVs`
                    let savedData = savedRequest[RequestDataMap.bodyRawJSONKVs.saveKey]
                    builders.bodyRawJSONKVs = Util.convertNEIInputsToJSON(request, dataSource, savedData, Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                        readonly: true,
                        typeChangeable: false,
                        childTypeChangeable: false
                    }))
                } else {
                    // normal form header is default set, nei need not set this header
                    builders.headerKVs.push(Object.assign({}, DEFAULT_XFORM_HEADER_KV, {
                        readonly: true,
                        valueReadonly: true,
                        keyDataList: null,
                        valueDataList: null,
                        title: 'Default normal request header'
                    }))
                    builders.bodyType.type = 'x-www-form-urlencoded'
                    // init request inputs
                    let xFormKVTpl = _.cloneDeep(DEFAULT_BODY_XFORM_KV)
                    let savedBodyXFormKVs = savedRequest[RequestDataMap.bodyXFormKVs.saveKey]
                    _.forEachRight(request.inputs, (input) => {
                        let foundSavedField = _.find(savedBodyXFormKVs, (kv) => {
                            return kv.key === input.name
                        })
                        builders.bodyXFormKVs.unshift(Object.assign({}, xFormKVTpl, {
                            title: input.description,
                            key: input.name,
                            value: foundSavedField && foundSavedField.value,
                            readonly: true
                        }))
                    })
                }
            } else {
                dealUrlParams(true)
            }
            // set headers
            _.each(request.headers, (header) => {
                if (header.name.toLowerCase() !== CONTENT_TYPE_STR.toLowerCase()) {
                    builders.headerKVs.push(Object.assign({}, DEFAULT_HEADERS_KV, {
                        key: header.name,
                        value: header.defaultValue,
                        readonly: true,
                        valueReadonly: true,
                        keyDataList: null,
                        valueDataList: null,
                        title: header.description
                    }))
                }
            })
            // set response json type
            builders.resJSONType = Util.getNEIParamsInfo(request.outputs, dataSource).valueType
            // set response checker by it's outputs
            builders.resCheckerKVs = Util.convertNEIOutputsToJSON(request, dataSource, Object.assign({}, DEFAULT_RES_CHECKER_KV, {
                readonly: true,
                typeChangeable: false,
                childTypeChangeable: false
            }))
        } else {
            builders.bodyTypes.forEach((bodyType) => {
                bodyType.disabled = false
            })
            if (savedRequest) {
                _.each(RequestDataMap, (value, key) => {
                    if (builders.hasOwnProperty(key)) {
                        if (typeof value === 'object') {
                            if (Array.isArray(savedRequest[value.saveKey])) {
                                if (savedRequest[value.saveKey].length) {
                                    let itemTpl = _.cloneDeep(builders[key][builders[key].length - 1])
                                    builders[key] = []
                                    _.each(savedRequest[value.saveKey], (v, k) => {
                                        _.each(value.fields, (vv, kk) => {
                                            itemTpl[kk] = v[vv]
                                        })
                                        builders[key].push(Object.assign({}, itemTpl))
                                    })
                                }
                            } else if (typeof(savedRequest[value.saveKey]) === 'object') {
                                _.each(value.fields, (vv, kk) => {
                                    builders[key][kk] = savedRequest[value.saveKey][vv]
                                })
                            } else {
                                builders[key] = savedRequest[value.saveKey]
                            }
                        } else {
                            builders[key] = savedRequest[value]
                        }
                    }
                })
                builders.bodyRawDataOriginal = builders.bodyRawData
                if (builders.resCheckerKVs) {
                    // refine res checker kvs
                    let refineResCheckerData = (data) => {
                        return data.values.map((item) => {
                            return Object.assign({}, DEFAULT_RES_CHECKER_KV, {
                                key: item.key,
                                checked: item.checked,
                                values: refineResCheckerData(item),
                                valueType: item.value_type,
                                childValueType: item.child_value_type,
                                typeChangeable: item.type_changeable,
                                childTypeChangeable: item.child_type_changeable
                            })
                        })
                    }
                    builders.resCheckerKVs.forEach((item) => {
                        item.values = refineResCheckerData(item)
                    })
                    if (builders.resJSONType !== 'object') {
                        Object.assign(builders.resCheckerKVs[0], {
                            duplicatable: false,
                            readonly: true,
                            typeChangeable: false,
                            key: `[[${builders.resJSONType} item]]`
                        })
                    }
                }

                if (builders.bodyRawJSONKVs) {
                    // refine body raw json kvs
                    let refineBodyRawJSONData = (data) => {
                        return data.values.map((item) => {
                            return Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                                key: item.key,
                                value: item.value,
                                checked: item.checked,
                                values: refineBodyRawJSONData(item),
                                valueType: item.value_type,
                                valueReadonly: item.value_readonly,
                                childValueType: item.child_value_type,
                                keyVisible: item.key_visible,
                                typeChangeable: item.type_changeable
                            })
                        })
                    }
                    builders.bodyRawJSONKVs.forEach((item) => {
                        item.values = refineBodyRawJSONData(item)
                    })
                    if (builders.bodyType.jsonType !== 'object') {
                        builders.bodyRawJSONKVs[0].duplicatable = false
                    }
                }
            }
        }
        let tab = {
            id: request.id,
            name: request.name || tabUrl,
            url: tabUrl,
            method: request.method,
            isNEI: request.isNEI,
            isDirty: false,
            urlError: false,
            folderId: request.folderId,
            collectionId: request.collectionId
        }
        ReqTabAction.changeTab(tab)
    },

    toggleReqMethodsList() {
        tabCons.items[tabIndex].showReqMethodList = !tabCons.items[tabIndex].showReqMethodList
    },

    changeMethod() {
        let tab = ReqTabStore.getTab(tabIndex)
        let isNoBodyMethod = Util.isNoBodyMethod(tab.method)
        let builders = tabCons.items[tabIndex].builders
        let bodyBuilder = _.find(builders.items, (builder) => {
            return builder.name === REQUEST_BODY_STR
        })
        bodyBuilder.disabled = isNoBodyMethod
        if (isNoBodyMethod && builders.activeTabName === REQUEST_BODY_STR) {
            this.switchBuilderTab(URL_PARAMS_STR)
        }
    },

    switchBuilderTab(activeTabName) {
        tabCons.items[tabIndex].builders.activeTabName = activeTabName
        this.changeAceEditorConfig()
    },

    changeAceEditorConfig(editorConfig) {
        let tabCon = tabCons.items[tabIndex]
        let activeTabName = tabCon.builders.activeTabName
        let bodyType = tabCons.items[tabIndex].builders.bodyType
        let config = {
            show: activeTabName === REQUEST_BODY_STR
            && bodyType.type === 'raw'
            && bodyType.name !== 'JSON(application/json)'
            || activeTabName === RESPONSE_STR
            && tabCon.builders.reqStatus === REQ_SUCCEEDED,
            readOnly: activeTabName === RESPONSE_STR
        }
        if (editorConfig) {
            Object.assign(config, editorConfig)
        }
        Object.assign(tabCon.aceEditorConfig, config)
    },

    __getTabUrl(tab, hosts) {
        let result = URL.parse(tab.url)
        if (result.host) {
            return tab.url
        }
        return (hosts.folders[tab.folderId] || hosts.collections[tab.collectionId] || '') + tab.url
    },

    checkReqSend(hosts) {
        // check if can send request now
        // check two things: url and path variable
        let canSend = true
        let tabState = ReqTabStore.getAll()
        let tab = tabState.reqTab.tabs[tabIndex]
        let tabUrl = this.__getTabUrl(tab, hosts)
        // check url
        if (!tabUrl) {
            // url can't be blank
            canSend = false
            tab.urlError = true
        } else {
            tab.urlError = false
        }
        if (!canSend) {
            return canSend
        }
        // check all path variable has it's value
        let params = tabCons.items[tabIndex].builders.paramKVs
        params.forEach((param) => {
            if (param.isPV) {
                if (!param.value) {
                    param.valueError = true
                    canSend = false
                } else {
                    tabUrl = tabUrl.replace(':' + param.key, param.value)
                }
            }
        })
        if (!canSend) {
            tabConActions.switchBuilderTab(URL_PARAMS_STR)
        }
        if (canSend) {
            tab.rurl = tabUrl // it is the correct request url
            let builders = tabCons.items[tabIndex].builders
            builders.reqStatus = REQ_SENDING
            tabConActions.switchBuilderTab(RESPONSE_STR)
            // clear previous fetched data
            builders.fetchResponse = null
            builders.fetchResponseRawData = null
            builders.fetchResponseData = null
            builders.fetchResponseIsJSON = false
            builders.resFilePath = null
        }
        return canSend
    },

    sendReq(hosts) {
        let canSend = this.checkReqSend(hosts)
        if (!canSend) return
        Requester.fetch((res, data) => {
            tabConActions.switchBuilderTab(RESPONSE_STR)
            let tabCon = tabCons.items[tabIndex]
            let builders = tabCon.builders
            builders.fetchResponse = res
            builders.fetchResponseRawData = data
            if (!res) {
                // no response, error happened
                builders.reqStatus = REQ_FAILED
            } else {
                // has response
                builders.reqStatus = REQ_SUCCEEDED
                tabCon.aceEditorConfig.show = true
                builders.resShowType = Object.assign({}, DEFAULT_RES_SHOW_TYPE)
                let jsonData
                try {
                    jsonData = JSON.parse(data)
                } catch(err) {
                    console.log(err)
                    builders.resCheckerResult = {
                        status: 'failed',
                        info: 'Response data is not a valid JSON'
                    }
                    builders.resShowType.prettyType = 'HTML'
                    tabCon.aceEditorConfig.mode = 'html'
                }
                if (jsonData) {
                    builders.fetchResponseData = JSON.stringify(jsonData, null, '\t')
                    builders.resShowType.prettyType = 'JSON'
                    tabCon.aceEditorConfig.mode = 'json'
                    builders.fetchResponseIsJSON = true
                    // response checker
                    builders.resCheckerResult = Util.checkResponseResult(builders.resCheckerKVs, builders.resJSONType, jsonData)
                }
            }
            ReqTabConStore.emitChange()
            ReqTabConStore.emitAceEditorUpdate()
        })
    }
}

let paramActions = {

    fillURLParams() {
        let oldParamKVS = tabCons.items[tabIndex].builders.paramKVs
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let params = Util.getUrlParams(tabUrl)
        let oldPV
        params = params.map((param) => {
            oldPV = _.find(oldParamKVS, (kv) => {
                return kv.isPV && kv.key === param.key
            })
            return Object.assign({}, DEFAULT_PARAMS_KV, param, {
                value: oldPV && oldPV.value || param.value
            })
        })
        params.push(Object.assign({}, DEFAULT_PARAMS_KV))
        tabCons.items[tabIndex].builders.paramKVs = params
        let hasPathVariable
        _.each(params, (param) => {
            if (param.isPV) {
                hasPathVariable = true
            }
        })
        // if has path variable, active url params tab
        if (hasPathVariable) {
            tabConActions.switchBuilderTab(URL_PARAMS_STR)
        }
    },

    toggleURLParamsKV(rowIndex) {
        let kv = tabCons.items[tabIndex].builders.paramKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.paramKVs[rowIndex].checked
        this.updateTabUrl()
    },

    addURLParamsKV() {
        tabCons.items[tabIndex].builders.paramKVs.push(Object.assign({}, DEFAULT_PARAMS_KV))
    },

    removeURLParamsKV(rowIndex) {
        tabCons.items[tabIndex].builders.paramKVs.splice(rowIndex, 1)
        this.updateTabUrl()
    },

    changeURLParamsKVKey (rowIndex, value) {
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONFlat(json, DEFAULT_PARAMS_KV, tabCons.items[tabIndex].builders.paramKVs)
            this.updateTabUrl()
        } else {
            this.changeURLParams(rowIndex, value, 'key')
        }
    },

    changeURLParamsKVValue (rowIndex, value) {
        this.changeURLParams(rowIndex, value, 'value')
    },

    changeURLParams(rowIndex, value, type) {
        let param = tabCons.items[tabIndex].builders.paramKVs[rowIndex]
        param[type] = value
        this.updateTabUrl()
    },

    updateTabUrl() {
        let tabUrl = ReqTabStore.getTabUrl(tabIndex)
        let queryParams = tabCons.items[tabIndex].builders.paramKVs
        let newUrl = Util.getURLByQueryParams(tabUrl, queryParams)
        ReqTabStore.setTabUrl(tabIndex, newUrl)
    }
}

let headerActions = {

    toggleHeaderKV(rowIndex) {
        let kv = tabCons.items[tabIndex].builders.headerKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.headerKVs[rowIndex].checked
    },

    addHeaderKV() {
        tabCons.items[tabIndex].builders.headerKVs.push(Object.assign({}, DEFAULT_HEADERS_KV))
    },

    removeHeaderKV(rowIndex) {
        tabCons.items[tabIndex].builders.headerKVs.splice(rowIndex, 1)
    },

    changeHeaderKVKey(rowIndex, value) {
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONFlat(json, DEFAULT_HEADERS_KV, tabCons.items[tabIndex].builders.headerKVs)
            this.__dealValueDataList()
        } else {
            this.changeHeader(rowIndex, value, 'key')
        }
    },

    changeHeaderKVValue(rowIndex, value) {
        this.changeHeader(rowIndex, value, 'value')
    },

    changeHeader(rowIndex, value, type) {
        let header = tabCons.items[tabIndex].builders.headerKVs[rowIndex]
        header[type] = value
        this.__dealValueDataList()
    },

    __dealValueDataList() {
        let headers = tabCons.items[tabIndex].builders.headerKVs
        headers.forEach((header) => {
            if (header['keyDataList']) {
                if (header.key === CONTENT_TYPE_STR) {
                    header.valueDataList = REQ_MIDIATYPES_DATA_LIST
                } else {
                    header.valueDataList = BLANK_STR
                }
            }
            // change to body's raw type and update it's value
            if (header.key === CONTENT_TYPE_STR) {
                let rawType = _.find(tabCons.rawTypes, (rawType) => {
                    return rawType.value === header.value
                })
                let bodyType = tabCons.items[tabIndex].builders.bodyType
                if (header.value === XFORM_CONTENT_TYPE_VALUE) {
                    bodyType.name = XFORM_CONTENT_TYPE
                } else {
                    bodyType.name = 'raw'
                    bodyType.value = rawType ? rawType.name : ''
                }
            }
        })
    }
}

let bodyActions = {

    changeBodyType(bodyType) {
        tabCons.items[tabIndex].builders.bodyType.type = bodyType
        let headers = tabCons.items[tabIndex].builders.headerKVs
        if (bodyType === 'form-data' || bodyType === 'binary') {
            // clear header `Content-type`
            _.remove(headers, (header) => {
                return header.key === CONTENT_TYPE_STR
            })
        } else if (bodyType === XFORM_CONTENT_TYPE) {
            let contentType = _.find(headers, (header) => {
                return header.key == CONTENT_TYPE_STR
            })
            if (contentType) {
                // update header `Content-type`
                contentType.value = XFORM_CONTENT_TYPE_VALUE
            } else {
                // add header `Content-type`
                headers.unshift(DEFAULT_XFORM_HEADER_KV)
            }
        } else if (bodyType === 'raw') {
            let rawType = _.find(tabCons.rawTypes, (rt) => {
                return rt.name == tabCons.items[tabIndex].builders.bodyType.name
            })
            this.changeBodyTypeValue(rawType)
        }
        tabConActions.changeAceEditorConfig()
    },

    changeBodyTypeValue(bodyType) {
        let isTextType = bodyType.name.toLowerCase() === 'text'
        let headers = tabCons.items[tabIndex].builders.headerKVs
        let contentType = _.find(headers, (header) => {
            return header.key == CONTENT_TYPE_STR
        })
        Object.assign(tabCons.items[tabIndex].builders.bodyType, {
            name: bodyType.name,
            value: bodyType.value
        })
        if (!isTextType) {
            if (contentType) {
                // update header `Content-type`
                contentType.value = bodyType.value
            } else {
                // add header `Content-type`
                headers.unshift(Object.assign({}, DEFAULT_HEADERS_KV, {
                    key: CONTENT_TYPE_STR,
                    value: bodyType.value,
                    valueDataList: REQ_MIDIATYPES_DATA_LIST
                }))
            }
        } else if (contentType) {
            // clear header `Content-type`
            _.remove(headers, (header) => {
                return header.key === CONTENT_TYPE_STR
            })
        }
        tabConActions.changeAceEditorConfig(bodyType.editorConfig)
    },

    toggleBodyTypeList() {
        tabCons.items[tabIndex].showBodyRawTypeList = !tabCons.items[tabIndex].showBodyRawTypeList
    },

    // body form data kv action
    toggleBodyFormDataKV(rowIndex) {
        let kv = tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex].checked
    },

    addBodyFormDataKV() {
        tabCons.items[tabIndex].builders.bodyFormDataKVs.push(Object.assign({}, DEFAULT_BODY_FORMDATA_KV))
    },

    removeBodyFormDataKV(rowIndex) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs.splice(rowIndex, 1)
    },

    changeBodyFormDataKVKey(rowIndex, value) {
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONFlat(json, DEFAULT_BODY_FORMDATA_KV, tabCons.items[tabIndex].builders.bodyFormDataKVs)
        } else {
            this.changeBodyFormData(rowIndex, value, 'key')
        }
    },

    changeBodyFormDataKVValue(rowIndex, value) {
        this.changeBodyFormData(rowIndex, value, 'value')
    },

    changeBodyFormData(rowIndex, value, type) {
        let kv = tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex]
        kv[type] = value
    },

    changeBodyFormDataKVValueType(rowIndex, value) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex].valueType = value
    },

    changeBodyFormDataKVFileValue(rowIndex, fileInput) {
        tabCons.items[tabIndex].builders.bodyFormDataKVs[rowIndex].fileInput = fileInput
    },

    // body x form kv action
    toggleBodyXFormKV(rowIndex) {
        let kv = tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex]
        if (kv.readonly) return
        kv.checked = !tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex].checked
    },

    addBodyXFormKV() {
        tabCons.items[tabIndex].builders.bodyXFormKVs.push(Object.assign({}, DEFAULT_BODY_XFORM_KV))
    },

    removeBodyXFormKV(rowIndex) {
        tabCons.items[tabIndex].builders.bodyXFormKVs.splice(rowIndex, 1)
    },

    changeBodyXFormKVKey(rowIndex, value) {
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONFlat(json, DEFAULT_BODY_XFORM_KV, tabCons.items[tabIndex].builders.bodyXFormKVs)
        } else {
            this.changeBodyXForm(rowIndex, value, 'key')
        }
    },

    changeBodyXFormKVValue(rowIndex, value) {
        this.changeBodyXForm(rowIndex, value, 'value')
    },

    changeBodyXForm(rowIndex, value, type) {
        let kv = tabCons.items[tabIndex].builders.bodyXFormKVs[rowIndex]
        kv[type] = value
    },

    changeBodyBinaryFile(fileInput) {
        tabCons.items[tabIndex].builders.bodyBinaryFileInput = fileInput
    },

    changeBodyRawData(text) {
        let tabCon = tabCons.items[tabIndex]
        if (tabCon.builders.activeTabName === RESPONSE_STR) {
            // response tab, should not change bodyRawData
            return
        }
        tabCons.items[tabIndex].builders.bodyRawData = text
    }

}

let bodyRawJSONActions = {

    toggleBodyRawJSONList() {
        tabCons.items[tabIndex].showBodyJSONTypeList = !tabCons.items[tabIndex].showBodyJSONTypeList
    },

    changeBodyRawJSONType(jsonType) {
        let builders = tabCons.items[tabIndex].builders
        let oldJSONType = builders.bodyType.jsonType
        if (oldJSONType === jsonType) {
            return
        }
        builders.bodyType.jsonType = jsonType
        let newKV = Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
            values: []
        })
        switch (jsonType) {
            case 'object':
                builders.bodyRawJSONKVs = [newKV]
                break

            case 'array':
                Object.assign(newKV, {
                    keyVisible: false,
                    key: ARRAY_ITEM_PLACEHOLDER, // while save data, the key should have value
                    value: '[[array]]',
                    readonly: true,
                    valueReadonly: true,
                    typeChangeable: false,
                    duplicatable: false,
                    valueType: jsonType
                })
                let childItem = Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                    values: [],
                    keyVisible: false,
                    typeChangeable: false
                })
                newKV.values.push(childItem)
                builders.bodyRawJSONKVs = [newKV]
                break

            case 'string':
            case 'number':
            case 'boolean':
                Object.assign(newKV, {
                    key: ARRAY_ITEM_PLACEHOLDER, // while save data, the key should have value
                    keyVisible: false,
                    typeChangeable: false,
                    duplicatable: false,
                    valueType: jsonType
                })
                builders.bodyRawJSONKVs = [newKV]
                break

            default:
                break
        }
    },

    getBodyRawJSONRow(rowIndex) {
        let bodyRawJSONKVs = tabCons.items[tabIndex].builders.bodyRawJSONKVs
        let indexes = rowIndex.split('.')
        let parentRow = bodyRawJSONKVs
        let targetRow = bodyRawJSONKVs
        for (let i = 0; i < indexes.length; i++) {
            parentRow = targetRow
            targetRow = (targetRow.values || targetRow)[indexes[i]]
        }
        return {
            targetIndex: indexes[indexes.length - 1],
            target: targetRow,
            parent: parentRow.values || parentRow,
            parentValueType: parentRow.valueType,
            parentChildValueType: parentRow.childValueType
        }
    },

    toggleBodyRawJSONKV(rowIndex) {
        let row = this.getBodyRawJSONRow(rowIndex)
        if (row.target.readonly) return
        let checked = !row.target.checked
        row.target.checked = checked
        let dealChild = (target) => {
            _.each(target.values, (kv) => {
                kv.checked = checked
                dealChild(kv)
            })
        }
        dealChild(row.target)
    },

    addBodyRawJSONKV(rowIndex, kv) {
        let row = this.getBodyRawJSONRow(rowIndex)
        if (+row.targetIndex === row.parent.length - 1) {
            let item = Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                values: []
            })
            if (row.parentValueType === 'array') {
                item.valueType = row.parentChildValueType
                item.parentValueType = row.parentValueType
                item.typeChangeable = false
                item.keyVisible = false
                if (/^object$/.test(row.parentChildValueType)) {
                    item.value = ARRAY_ITEM_PLACEHOLDER
                    item.valueReadonly = true
                    if (kv) {
                        // in NEI, the new added object item should be same as the first element
                        item.value = kv.value
                        item.values = _.cloneDeep(kv.values)
                        item.values.forEach((kv) => {
                            if (!/^(object|array)$/.test(kv.valueType)) {
                                kv.value = ''
                            }
                        })
                    } else {
                        item.values.push(Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                            values: []
                        }))
                    }
                }
            }
            row.parent.push(item)
        }
    },

    removeBodyRawJSONKV(rowIndex) {
        let row = this.getBodyRawJSONRow(rowIndex)
        row.parent.splice(row.targetIndex, 1)
    },

    changeBodyRawJSONKVKey(rowIndex, value) {
        let row = this.getBodyRawJSONRow(rowIndex)
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONRecurse(json, DEFAULT_BODY_RAW_JSON_KV, row.parent)
        } else {
            row.target.key = value
        }
    },

    changeBodyRawJSONKVValue(rowIndex, value) {
        let row = this.getBodyRawJSONRow(rowIndex)
        row.target.value = value
    },

    changeBodyRawJSONKVValueType(rowIndex, valueType) {
        let row = this.getBodyRawJSONRow(rowIndex)
        row.target.values = []
        row.target.valueReadonly = false
        row.target.valueType = valueType
        row.target.childValueType = ''
        if (/^object$/.test(valueType)) {
            row.target.values.push(Object.assign({}, DEFAULT_BODY_RAW_JSON_KV))
            row.target.valueReadonly = true
        } else if (/^array$/.test(valueType)) {
            row.target.valueReadonly = true
            row.target.childValueType = 'string'
            row.target.values.push(Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                keyVisible: false,
                typeChangeable: false
            }))
        }
    },

    changeBodyRawJSONKVChildValueType(rowIndex, valueType) {
        let row = this.getBodyRawJSONRow(rowIndex)
        row.target.values = []
        row.target.childValueType = valueType
        let item = Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
            values: [],
            valueType: valueType,
            keyVisible: false,
            typeChangeable: false
        })
        row.target.values.push(item)
        if (/^object$/.test(valueType)) {
            item.value = ARRAY_ITEM_PLACEHOLDER
            item.valueReadonly = true
            item.values.push(Object.assign({}, DEFAULT_BODY_RAW_JSON_KV, {
                values: []
            }))
        }
    }
}

let resCheckerActions = {

    getResCheckerRow(rowIndex) {
        let resCheckerKVs = tabCons.items[tabIndex].builders.resCheckerKVs
        let indexes = rowIndex.split('.')
        let parentRow = resCheckerKVs
        let targetRow = resCheckerKVs
        for (let i = 0; i < indexes.length; i++) {
            parentRow = targetRow
            targetRow = (targetRow.values || targetRow)[indexes[i]]
        }
        return {
            targetIndex: indexes[indexes.length - 1],
            target: targetRow,
            parent: parentRow.values || parentRow
        }
    },

    toggleResCheckerKV(rowIndex) {
        let row = this.getResCheckerRow(rowIndex)
        if (row.target.readonly) return
        let checked = !row.target.checked
        row.target.checked = checked
        let dealChild = (target) => {
            _.each(target.values, (kv) => {
                kv.checked = checked
                dealChild(kv)
            })
        }
        dealChild(row.target)
    },

    addResCheckerKV(rowIndex) {
        let row = this.getResCheckerRow(rowIndex)
        if (+row.targetIndex === row.parent.length - 1) {
            row.parent.push(Object.assign({}, DEFAULT_RES_CHECKER_KV))
        }
    },

    removeResCheckerKV(rowIndex) {
        let row = this.getResCheckerRow(rowIndex)
        row.parent.splice(row.targetIndex, 1)
    },

    changeResCheckerKVKey(rowIndex, value) {
        let row = this.getResCheckerRow(rowIndex)
        let json = Util.getJSONByValue(value)
        if (typeof json === 'object') {
            Util.addKVsByJSONRecurse(json, DEFAULT_RES_CHECKER_KV, row.parent)
        } else {
            row.target.key = value
        }
    },

    changeResCheckerKVValueType(rowIndex, valueType) {
        let row = this.getResCheckerRow(rowIndex)
        row.target.values = []
        row.target.valueType = valueType
        row.target.childValueType = ''
        if (/^object$/.test(valueType)) {
            row.target.values.push(Object.assign({}, DEFAULT_RES_CHECKER_KV))
        } else if (/^array$/.test(valueType)) {
            row.target.childValueType = 'string'
        }
    },

    changeResCheckerKVChildValueType(rowIndex, valueType) {
        let row = this.getResCheckerRow(rowIndex)
        row.target.values = []
        row.target.childValueType = valueType
        if (/^object$/.test(valueType)) {
            row.target.values.push(Object.assign({}, DEFAULT_RES_CHECKER_KV))
        }
    },

    toggleResCheckerJSONTypeList() {
        tabCons.items[tabIndex].showResJSONTypeList = !tabCons.items[tabIndex].showResJSONTypeList
    },

    changeResCheckerJSONType(jsonType) {
        let builders = tabCons.items[tabIndex].builders
        let oldJSONType = builders.resJSONType
        if (oldJSONType === jsonType) {
            return
        }
        builders.resJSONType = jsonType
        let newKV = Object.assign({}, DEFAULT_RES_CHECKER_KV, {
            values: []
        })
        switch (jsonType) {
            case 'object':
                builders.resCheckerKVs = [newKV]
                break

            case 'array':
            case 'string':
            case 'number':
            case 'boolean':
                Object.assign(newKV, {
                    key: `[[${jsonType}]]`,
                    readonly: true,
                    typeChangeable: false,
                    duplicatable: false,
                    valueType: jsonType
                })
                builders.resCheckerKVs = [newKV]
                break

            default:
                break
        }
    }
}

let resActions = {

    toggleResPrettyTypeList() {
        tabCons.items[tabIndex].showResPrettyTypeList = !tabCons.items[tabIndex].showResPrettyTypeList
    },

    changeResPrettyTypeValue(prettyType) {
        tabCons.items[tabIndex].builders.resShowType.prettyType = prettyType
        tabCons.items[tabIndex].aceEditorConfig.mode = prettyType.toLowerCase()
    },

    changeResShowType(showType) {
        let tabCon = tabCons.items[tabIndex]
        tabCon.builders.resShowType.type = showType
        let editorConfig = {}
        let prettyType
        if (showType !== 'Pretty') {
            editorConfig.show = false
        } else {
            editorConfig.show = true
            if (tabCon.builders.fetchResponseIsJSON) {
                editorConfig.mode = 'json'
                prettyType = 'JSON'
            } else {
                editorConfig.mode = 'html'
                prettyType = 'HTML'
            }
        }
        Object.assign(tabCon.aceEditorConfig, editorConfig)
        tabCon.builders.resShowType.prettyType = prettyType
    }

}

let actions = Object.assign({}, tabConActions, paramActions, headerActions, bodyActions, bodyRawJSONActions, resCheckerActions, resActions)

let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCon: {
                reqCons: tabCons.items,
                reqMethods: tabCons.reqMethods,
                rawTypes: tabCons.rawTypes,
                jsonTypes: tabCons.jsonTypes,
                prettyTypes: tabCons.prettyTypes,
                aceEditorId: tabCons.aceEditorId
            }
        }
    },

    removeCon(tabIndex) {
        actions.removeCon(tabIndex)
    },

    addCon() {
        actions.addCon()
    },

    getCurrentCon() {
        return tabCons.items[tabIndex]
    },

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    },

    emitAceEditorUpdate() {
        this.emit(ACE_EDITOR_UPDATE_EVENT)
    },

    addAceEditorUpdateListener(callback) {
        this.on(ACE_EDITOR_UPDATE_EVENT, callback)
    },

    removeAceEditorUpdateListener(callback) {
        this.removeListener(ACE_EDITOR_UPDATE_EVENT, callback)
    }
})

AppDispatcher.register((action) => {
    tabIndex = ReqTabStore.getActiveIndex()
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

        case AppConstants.REQ_CONTENT_UPDATE_BY_REQUEST:
            actions.updateConByRequest(action.request, action.dataSource, () => {
                ReqTabConStore.emitChange()
                ReqTabConStore.emitAceEditorUpdate()
            })
            break

        case AppConstants.REQ_CONTENT_TOGGLE_METHODS_LIST:
            actions.toggleReqMethodsList()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_CHANGE_METHOD:
            actions.changeMethod()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_FILL_URL_PARAMS:
            actions.fillURLParams()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_CONTENT_UPDATE_ACE_EDITOR:
            ReqTabConStore.emitAceEditorUpdate()
            break

        case AppConstants.REQ_CONTENT_SEND:
            StorageArea.get('hosts', (result) => {
                actions.sendReq(result.hosts)
                ReqTabConStore.emitChange()
            })
            break
        // req content action <---


        // req url params action --->
        case AppConstants.REQ_URL_PARAMS_TOGGLE_KV:
            actions.toggleURLParamsKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_URL_PARAMS_ADD_KV:
            actions.addURLParamsKV()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_URL_PARAMS_REMOVE_KV:
            actions.removeURLParamsKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_URL_PARAMS_CHANGE_KV_KEY:
            actions.changeURLParamsKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_URL_PARAMS_CHANGE_KV_VALUE:
            actions.changeURLParamsKVValue(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req url params action <---


        // req builder action --->
        case AppConstants.REQ_BUILDER_SWITCH_TAB:
            actions.switchBuilderTab(action.activeTabName)
            ReqTabConStore.emitChange()
            ReqTabConStore.emitAceEditorUpdate()
            break

        case AppConstants.REQ_BODY_CHANGE_RAW_DATA:
            actions.changeBodyRawData(action.text)
            ReqTabConStore.emitChange()
            break
        // req builder action <---


        // req header action --->
        case AppConstants.REQ_HEADER_TOGGLE_KV:
            actions.toggleHeaderKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_ADD_KV:
            actions.addHeaderKV()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_REMOVE_KV:
            actions.removeHeaderKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_KV_KEY:
            actions.changeHeaderKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_HEADER_CHANGE_KV_VALUE:
            actions.changeHeaderKVValue(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // req header action <---


        // req body action --->
        case AppConstants.REQ_BODY_CHANGE_TYPE:
            actions.changeBodyType(action.bodyType)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_CHANGE_TYPE_VALUE:
            actions.changeBodyTypeValue(action.bodyTypeValue)
            ReqTabConStore.emitChange()
            ReqTabConStore.emitAceEditorUpdate()
            break

        case AppConstants.REQ_BODY_TOGGLE_TYPE_LIST:
            actions.toggleBodyTypeList()
            ReqTabConStore.emitChange()
            break
        // body raw json kv action
        case AppConstants.REQ_BODY_RAW_JSON_TOGGLE_JSON_TYPE_LIST:
            actions.toggleBodyRawJSONList()
            ReqTabConStore.emitChange()
            break
        case AppConstants.REQ_BODY_RAW_JSON_CHANGE_JSON_TYPE:
            actions.changeBodyRawJSONType(action.jsonType)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_TOGGLE_KV:
            actions.toggleBodyRawJSONKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_ADD_KV:
            actions.addBodyRawJSONKV(action.rowIndex, action.kv)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_REMOVE_KV:
            actions.removeBodyRawJSONKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_CHANGE_KV_KEY:
            actions.changeBodyRawJSONKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_CHANGE_KV_VALUE:
            actions.changeBodyRawJSONKVValue(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_CHANGE_KV_VALUE_TYPE:
            actions.changeBodyRawJSONKVValueType(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_RAW_JSON_CHANGE_KV_CHILD_VALUE_TYPE:
            actions.changeBodyRawJSONKVChildValueType(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break
        // body form data kv action
        case AppConstants.REQ_BODY_FORMDATA_TOGGLE_KV:
            actions.toggleBodyFormDataKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_ADD_KV:
            actions.addBodyFormDataKV()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_REMOVE_KV:
            actions.removeBodyFormDataKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_KEY:
            actions.changeBodyFormDataKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE:
            actions.changeBodyFormDataKVValue(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE:
            actions.changeBodyFormDataKVValueType(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_FILE_VALUE:
            actions.changeBodyFormDataKVFileValue(action.rowIndex, action.fileInput)
            break

        //body x form kv action
        case AppConstants.REQ_BODY_XFORM_TOGGLE_KV:
            actions.toggleBodyXFormKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_ADD_KV:
            actions.addBodyXFormKV()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_REMOVE_KV:
            actions.removeBodyXFormKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_CHANGE_KV_KEY:
            actions.changeBodyXFormKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_BODY_XFORM_CHANGE_KV_VALUE:
            actions.changeBodyXFormKVValue(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        // body binary action
        case AppConstants.REQ_BODY_BINARY_FILE:
            actions.changeBodyBinaryFile(action.fileInput)
            break
        // req body action <---

        // res action --->
        case AppConstants.RES_TOGGLE_PRETTY_TYPE_LIST:
            actions.toggleResPrettyTypeList()
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHANGE_PRETTY_TYPE_VALUE:
            actions.changeResPrettyTypeValue(action.prettyType)
            ReqTabConStore.emitChange()
            ReqTabConStore.emitAceEditorUpdate()
            break

        case AppConstants.RES_CHANGE_SHOW_TYPE:
            actions.changeResShowType(action.showType)
            ReqTabConStore.emitChange()
            ReqTabConStore.emitAceEditorUpdate()
            break

        case AppConstants.RES_EMIT_CHANGE:
            ReqTabConStore.emitChange()
            break

        // response checker action --->
        case AppConstants.RES_CHECKER_TOGGLE_KV:
            actions.toggleResCheckerKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_ADD_KV:
            actions.addResCheckerKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_REMOVE_KV:
            actions.removeResCheckerKV(action.rowIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_CHANGE_KV_KEY:
            actions.changeResCheckerKVKey(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_CHANGE_KV_VALUE_TYPE:
            actions.changeResCheckerKVValueType(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_CHANGE_KV_CHILD_VALUE_TYPE:
            actions.changeResCheckerKVChildValueType(action.rowIndex, action.value)
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_TOGGLE_JSON_TYPE_LIST:
            actions.toggleResCheckerJSONTypeList()
            ReqTabConStore.emitChange()
            break

        case AppConstants.RES_CHECKER_CHANGE_JSON_TYPE:
            actions.changeResCheckerJSONType(action.jsonType)
            ReqTabConStore.emitChange()
            break
        // response checker action <---

        default:
            break
    }

})

export default ReqTabConStore
