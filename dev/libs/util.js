//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import _ from 'lodash'

const DEFAULT_PATH_VARIABLE_PLACEHOLDER = 'Path Variable Key'
const pathVariableExp = new RegExp('/:(\\w+?[^/]*)', 'g')
//const queryExp = new RegExp('(\\w+)=(\\w+)|(\\w+)=*|=*(\\w+)', 'g')

let Util = {

    getLocaleDate(ms) {
        if (!ms) return
        let date = new Date(ms)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let mu = date.getMinutes()
        let s = date.getSeconds()

        function f(ff) {
            return ff < 10 ? '0' + ff : ff
        }

        m = f(m)
        h = f(h)
        d = f(d)
        mu = f(mu)
        s = f(s)
        return y + '-' + m + '-' + d + ' ' + h + ':' + mu
    },

    getUrlParams(url) {
        let params = []
        if (!url) return params
        let result = URL.parse(url)
        let ret
        if (result.pathname) {
            // 'you/:id/:path/update'
            while ((ret = pathVariableExp.exec(result.pathname)) != null) {
                params.push({
                    keyPlaceholder: DEFAULT_PATH_VARIABLE_PLACEHOLDER,
                    isPV: true, // it is path variable
                    readonly: true, // can't change key, readonly flag
                    key: ret[1]
                })
            }
        }
        if (result.query) {
            //// '&name=hello&name=&=hello'
            //while ((ret = queryExp.exec(result.query)) != null) {
            //    if (ret[1]) {
            //        // key and value: `name=hello`
            //        params.push({
            //            key: ret[1],
            //            value: ret[2]
            //        })
            //    } else if (ret[3]) {
            //        // only key: `name=`
            //        params.push({
            //            key: ret[3],
            //            value: ''
            //        })
            //    } else if (ret[4]) {
            //        // only value: `=hello`
            //        params.push({
            //            key: '',
            //            value: ret[4]
            //        })
            //    }
            //}
            // use QueryString
            let queryParts = QueryString.parse(result.query)
            for (let p in queryParts) {
                if (Array.isArray(queryParts[p])) {
                    queryParts[p].forEach((qp) => {
                        params.push({
                            key: p,
                            value: qp
                        })
                    })
                } else {
                    params.push({
                        key: p,
                        value: queryParts[p]
                    })
                }
            }
        }
        return params
    },

    getURLByQueryParams(url, queryParams) {
        let result = URL.parse(url)
        result.search = '' // URL.format: query (object; see querystring) will only be used if search is absent.
        result.query = this.getQuery(queryParams)
        return URL.format(result)
    },

    getQuery(queryParams) {
        let query = {}
        queryParams.map((param, index) => {
            if (param.isPV) return
            if ((!param.key && !param.value) || !param.checked) return
            if (!query[param.key]) {
                query[param.key] = []
            }
            query[param.key].push(param.value || '')
        })
        return query
    },

    replaceURLHost(url, newHost) {
        let result = URL.parse(url)
        result.href = null
        if (!newHost) {
            result.host = null
            result.hostname = null
            result.protocol = null
            result.auth = null
            result.slashes = false
        } else {
            let result1 = URL.parse(newHost)
            result.host = result1.host
            result.hostname = result1.hostname
            result.protocol = result1.protocol
            result.auth = result1.auth
        }
        return URL.format(result)
    },

    stripScriptTag(text) {
        if (!text) return text;
        var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
        text = text.replace(re, "");
        return text;
    },

    copyToClipboard(text){
        var ta = document.createElement('textarea')
        ta.className = 'copy-textarea'
        document.body.appendChild(ta)
        ta.innerHTML = text
        ta.focus()
        document.execCommand('selectall')
        document.execCommand('copy', false, null)
        document.body.removeChild(ta)
    },

    fetchNEICollections(neiServerUrl, hosts, callback) {
        let projectGroupUrl = neiServerUrl + '/api/projGroup/getProList'
        let projectUrl = neiServerUrl + '/api/projectView/getByProjectId?pid='
        let fetchOptions = {
            credentials: 'include',
            method: 'POST'
        }
        let res
        let collections = []
        let convertDataAndReturn = (projectGroups, projects) => {
            let methodMap = {
                0: 'POST',
                1: 'GET',
                2: 'PUT',
                3: 'DELETE',
                4: 'HEAD'
            }
            projectGroups.forEach((pg) => {
                let collection = {
                    id: pg.id,
                    isNEI: true,
                    host: hosts.collections[pg.id] || '', // all requests' host, could be override by folder's host
                    name: pg.name,
                    attributes: [],
                    datatypes: [],
                    folders: [],
                    requests: []
                }
                pg.projects.forEach((p) => {
                    let folder = {
                        id: p.id,
                        name: p.name,
                        isNEI: true,
                        host: hosts.folders[p.id] || '', // folder's requests' host
                        orders: []
                    }
                    projects[p.id].interfaces.forEach((inter) => {
                        let request = {
                            id: inter.id,
                            isNEI: true,
                            path: inter.path,
                            method: methodMap[inter.method],
                            isRest: !!inter.isRest,
                            name: inter.name,
                            description: inter.description,
                            inputs: inter.inputs,
                            outputs: inter.outputs,
                            folderId: folder.id,
                            collectionId: collection.id
                        }
                        folder.orders.push(request.id)
                        collection.requests.push(request)
                    })
                    collection.attributes.push(...projects[p.id].attributes)
                    collection.datatypes.push(...projects[p.id].datatypes)
                    collection.folders.push(folder)
                })
                collections.push(collection)
            })
            callback(collections, res)
        }
        convertDataAndReturn(TestData.projectGroups, TestData.projects)
        return
        let getDetail = (projectGroups) => {
            let projects = {}
            async.eachSeries(projectGroups, (pg, cb) => {
                async.eachSeries(pg.projects, (p, cbb) => {
                    fetch(projectUrl + p.id, fetchOptions).then((response) => {
                        return response.json()
                    }).then((json) => {
                        projects[p.id] = json.result
                        cbb()
                    })
                }, () => {
                    cb()
                })
            }, () => {
                convertDataAndReturn(projectGroups, projects)
            })
        }
        fetch(projectGroupUrl, fetchOptions).then((response) => {
            res = response
            if (res.status == 403) {
                return callback(null, res)
            }
            return res.json()
        }).then((json) => {
            getDetail(json.result)
        })
    },

    fetchNEIProject(neiServerUrl, pId, callback) {
        let projectUrl = neiServerUrl + '/api/projectView/getByProjectId?pid='
        let fetchOptions = {
            credentials: 'include',
            method: 'POST'
        }
        let methodMap = {
            0: 'POST',
            1: 'GET',
            2: 'PUT',
            3: 'DELETE',
            4: 'HEAD'
        }
        let res
        let collection
        let convertDataAndReturn = (project) => {
            collection = {
                id: pId,
                isNEI: true,
                host: '',
                name: project.project.name,
                attributes: project.attributes,
                datatypes: project.datatypes,
                folders: [],
                requests: []
            }
            project.interfaces.forEach((inter) => {
                let request = {
                    id: inter.id,
                    isNEI: true,
                    path: inter.path,
                    method: methodMap[inter.method],
                    isRest: !!inter.isRest,
                    name: inter.name,
                    description: inter.description,
                    headers: inter.headers,
                    inputs: inter.inputs,
                    outputs: inter.outputs,
                    folderId: null,
                    collectionId: collection.id
                }
                collection.requests.push(request)
            })
            callback(res, collection)
        }
        fetch(projectUrl + pId, fetchOptions)
            .then((response) => {
                res = response
                return response.json()
            })
            .then((json) => {
                if (json.code !== 200) {
                    callback(res, null)
                } else {
                    convertDataAndReturn(json.result)
                }
            })
            .catch((err) => {
                callback(res, err)
            })
    },

    isNoBodyMethod(method) {
        return /^(get|copy|head|purge|unlock|view)$/.test(method.toLowerCase())
    },

    getPrimiteValue(value, type) {
        switch (type) {
            case 'string':
                // string
                return String(value)
            case 'number':
                // number
                return Number(value)
            case 'boolean':
                // boolean
                return value === 'true'
            default:
                return value
        }
    },

    convertNEIInputsToJSON(request, dataSource, savedData, itemTemplate) {
        let result = []
        let error = false
        let isSysType = (type) => {
            return /^(10000|10001|10002|10003)$/.test(type)
        }
        let typeMap = {
            10000: 'variable',
            10001: 'string',
            10002: 'number',
            10003: 'boolean'
        }
        let getEnumType = (enumName) => {
            if (/^(\d+)$/.test(enumName)) {
                return typeMap[10002]
            }
            if (/^(true|false)$/.test(enumName)) {
                return typeMap[10003]
            }
            return typeMap[10001]
        }
        let getEnumValue = (attributes) => {
            let result = attributes.map((attr) => {
                return attr.name
            })
            return result.join(',')
        }
        let traversedDataTypes = []
        let traversedLayers = 0
        let getItem = (input, resultContainer, data) => {
            if (isSysType(input.type)) {
                if (input.isArray) {
                    let childValueType = typeMap[input.type]
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        keyVisible: false,
                        value: input.name,
                        values: [],
                        valueReadonly: true,
                        valueType: 'array',
                        childValueType: childValueType
                    })
                    let arrItem = Object.assign({}, itemTemplate, {
                        keyVisible: false,
                        valueType: childValueType,
                        parentValueType: 'array',
                        values: [],
                        readonly: false
                    })
                    let storedData = _.find(data, (d) => {
                        return d.key === input.name
                    })
                    if (storedData && storedData.values) {
                        storedData.values.forEach((kv) => {
                            let item = _.clone(arrItem)
                            item.values = []
                            item.value = kv.value
                            tempItem.values.push(item)
                        })
                    }
                    if (!tempItem.values.length) {
                        tempItem.values.push(arrItem)
                    }
                    resultContainer.push(tempItem)
                } else {
                    let savedItem = _.find(data, (d) => {
                        return d.key === input.name
                    })
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        value: savedItem && savedItem.value || input.defaultValue,
                        title: input.description,
                        values: [],
                        valueType: typeMap[input.type]
                    })
                    resultContainer.push(tempItem)
                }
            } else {
                if (traversedDataTypes.indexOf(input.type) !== -1) {
                    // circular reference
                    let valueType
                    if (input.type === traversedDataTypes[traversedDataTypes.length - 1]) {
                        valueType = 'parent'
                    }
                    error = 'Circular Reference'
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        title: input.description,
                        values: [],
                        valueType: valueType
                    })
                    resultContainer.push(tempItem)
                    return
                }
                traversedDataTypes.push(input.type)
                traversedLayers++
                let dataType = _.find(dataSource.datatypes, (dt) => {
                    return dt.id === input.type
                })
                let attributes = _.filter(dataSource.attributes, (attr) => {
                    return attr.parentId === input.type
                })
                // dataSource has bug, attributes maybe duplicated
                attributes = _.uniq(attributes, 'id')
                let childValueType = typeMap[dataType.subtype] || 'object'
                if (dataType.format === 1) {
                    //enums
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        title: input.description,
                        values: [],
                        valueReadonly: true,
                        value: getEnumValue(attributes)
                    })
                    resultContainer.push(tempItem)
                } else if (dataType.format === 2) {
                    // array
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        keyVisible: false,
                        value: input.name,
                        title: input.description,
                        values: [],
                        valueType: 'array',
                        valueReadonly: true,
                        childValueType: childValueType
                    })
                    let storedData = _.find(data, (d) => {
                        return d.key === input.name
                    })
                    let storedValues = storedData && storedData.values || []
                    if (childValueType === 'object') {
                        let childItem = Object.assign({}, itemTemplate, {
                            valueType: tempItem.childValueType,
                            typeChangeable: false,
                            parentValueType: 'array',
                            valueReadonly: true,
                            key: '[[array item]]',
                            value: '[[array item]]',
                            keyVisible: false,
                            readonly: false
                        })
                        let childAttributes = _.filter(dataSource.attributes, (attr) => {
                            return attr.parentId === dataType.subtype
                        })
                        childAttributes = _.uniq(childAttributes, 'id')
                        storedValues.forEach((sv) => {
                            let item = _.clone(childItem)
                            item.values = []
                            childAttributes.forEach((attr) => {
                                getItem(attr, item.values, sv.values)
                            })
                            tempItem.values.push(item)
                        })
                        if (!tempItem.values.length) {
                            childAttributes.forEach((attr) => {
                                getItem(attr, childItem.values)
                            })
                            tempItem.values.push(childItem)
                        }
                    } else {
                        let childItem = Object.assign({}, itemTemplate, {
                            keyVisible: false,
                            valueType: childValueType,
                            typeChangeable: false,
                            parentValueType: 'array',
                            readonly: false
                        })
                        storedValues.forEach((sv) => {
                            let item = _.clone(childItem)
                            item.value = sv.value
                            tempItem.values.push(item)
                        })
                        if (!tempItem.values.length) {
                            tempItem.values.push(childItem)
                        }
                    }
                    resultContainer.push(tempItem)
                } else {
                    // hash object
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: input.name,
                        keyVisible: false,
                        value: input.name,
                        title: input.description,
                        valueReadonly: true,
                        values: [],
                        valueType: input.isArray ? 'array' : 'object',
                        childValueType: childValueType
                    })
                    if (input.isArray) {
                        tempItem.keyVisible = false
                        tempItem.value = input.name
                        let childItem = Object.assign({}, itemTemplate, {
                            value: '[[array item]]',
                            keyVisible: false,
                            values: [],
                            valueReadonly: true,
                            valueType: childValueType,
                            parentValueType: 'array',
                            readonly: false
                        })
                        if (childValueType === 'object' && Array.isArray(data) && data.length && data[0].values) {
                            data[0].values.forEach((kv) => {
                                let item = _.clone(childItem)
                                item.values = []
                                attributes.forEach((attr, index) => {
                                    getItem(attr, item.values, kv.values)
                                })
                                tempItem.values.push(item)
                            })
                        }
                        if (!tempItem.values.length) {
                            tempItem.values.push(childItem)
                        }
                    } else {
                        let storedData = _.find(data, (d) => {
                            return d.key === input.name
                        })
                        attributes.forEach((attr) => {
                            getItem(attr, tempItem.values, storedData && storedData.values || [])
                        })
                    }
                    resultContainer.push(tempItem)
                }
            }
        }
        let getData = (inputs, data) => {
            let paramsInfo = this.getNEIParamsInfo(inputs, dataSource)
            if (paramsInfo.valueType === 'object') {
                inputs.forEach((input, index) => {
                    getItem(input, result, data)
                    for (let i = 0; i < traversedLayers; i++) {
                        traversedDataTypes.pop()
                    }
                    traversedLayers = 0
                })
            } else {
                if (paramsInfo.valueType === 'array') {
                    let item = Object.assign({}, itemTemplate, {
                        key: '[[array]]',
                        value: '[[array]]',
                        valueReadonly: true,
                        title: inputs[0].description,
                        values: [],
                        valueType: 'array',
                        childValueType: paramsInfo.childValueType,
                        keyVisible: false,
                        duplicatable: false
                    })
                    if (paramsInfo.childValueType === 'object') {
                        let objItem = Object.assign({}, itemTemplate, {
                            key: '[[array item]]',
                            value: '[[array item]]',
                            valueReadonly: true,
                            values: [],
                            valueType: paramsInfo.childValueType,
                            keyVisible: false,
                            parentValueType: 'array',
                            readonly: false
                        })
                        if (data[0] && Array.isArray(data[0].values)) {
                            data[0].values.forEach((kv) => {
                                let tItem = Object.assign({}, objItem, {values: []})
                                paramsInfo.values.forEach((obj) => {
                                    getItem(obj, tItem.values, kv.values)
                                    for (let i = 0; i < traversedLayers; i++) {
                                        traversedDataTypes.pop()
                                    }
                                    traversedLayers = 0
                                })
                                item.values.push(tItem)
                            })
                        }
                        if (!item.values.length) {
                            // no stored data, default put one item
                            paramsInfo.values.forEach((obj) => {
                                getItem(obj, objItem.values)
                            })
                            item.values.push(objItem)
                        }
                    } else {
                        let primitiveItem = Object.assign({}, itemTemplate, {
                            key: '[[array item]]',
                            value: '',
                            values: [],
                            valueType: paramsInfo.childValueType,
                            keyVisible: false,
                            parentValueType: 'array',
                            readonly: false
                        })
                        if (data[0]) {
                            data[0].values.forEach((kv) => {
                                let tItem = Object.assign({}, primitiveItem, kv)
                                item.values.push(tItem)
                            })
                        }
                        if (!item.values.length) {
                            item.values.push(primitiveItem)
                        }
                    }
                    result.push(item)
                } else {
                    // just primitive value
                    let primitiveItem = Object.assign({}, itemTemplate, {
                        key: `[[${paramsInfo.valueType}]]`,
                        keyVisible: false,
                        value: data[0] && data[0].value,
                        values: [],
                        valueType: paramsInfo.valueType
                    })
                    result.push(primitiveItem)
                }
            }
        }
        savedData = typeof(savedData) === 'undefined' ? [] : savedData
        getData(request.inputs, savedData)
        return error || result
    },

    convertNEIOutputsToJSON(request, dataSource, itemTemplate) {
        let result = []
        let error = false
        let isSysType = (type) => {
            return /^(10000|10001|10002|10003)$/.test(type)
        }
        let typeMap = {
            10000: 'variable',
            10001: 'string',
            10002: 'number',
            10003: 'boolean'
        }
        let getEnumType = (enumName) => {
            if ((+enumName).toString() === enumName) {
                return typeMap[10002]
            }
            if (/^(true|false)$/.test(enumName)) {
                return typeMap[10003]
            }
            return typeMap[10001]
        }
        let traversedDataTypes = []
        let traversedLayers = 0
        let getItem = (output, resultContainer) => {
            if (isSysType(output.type)) {
                let tempItem = Object.assign({}, itemTemplate, {
                    key: output.name,
                    title: output.description,
                    values: []
                })
                if (output.isArray) {
                    tempItem.valueType = 'array'
                    tempItem.childValueType = typeMap[output.type]
                } else {
                    tempItem.valueType = typeMap[output.type]
                }
                resultContainer.push(tempItem)
            } else {
                if (traversedDataTypes.indexOf(output.type) !== -1) {
                    // circular reference
                    let childValueType
                    if (output.type === traversedDataTypes[traversedDataTypes.length - 1]) {
                        childValueType = 'parent'
                    } else {
                        error = 'Circular Reference'
                    }
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        title: output.description,
                        values: [],
                        valueType: 'array',
                        childValueType: childValueType
                    })
                    resultContainer.push(tempItem)
                    return
                }
                traversedDataTypes.push(output.type)
                traversedLayers++
                let dataType = _.find(dataSource.datatypes, (dt) => {
                    return dt.id === output.type
                })
                let attributes = _.filter(dataSource.attributes, (attr) => {
                    return attr.parentId === output.type
                })
                // dataSource has bug, attributes maybe duplicated
                attributes = _.uniq(attributes, 'id')
                let childValueType = typeMap[dataType.subtype] || 'object'
                if (dataType.format === 1) {
                    //enums
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        title: output.description,
                        values: [],
                        valueType: getEnumType(attributes[0].name)// all enums has same type, just judge the first element
                    })
                    resultContainer.push(tempItem)
                } else if (dataType.format === 2) {
                    // array
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        title: output.description,
                        values: [],
                        valueType: 'array',
                        childValueType: childValueType
                    })
                    if (childValueType === 'object') {
                        let childItem = Object.assign({}, itemTemplate, {
                            value: '[[array item]]',
                            keyVisible: false,
                            values: [],
                            valueType: childValueType
                        })
                        let childAttributes = _.filter(dataSource.attributes, (attr) => {
                            return attr.parentId === dataType.subtype
                        })
                        childAttributes = _.uniq(childAttributes, 'id')
                        childAttributes.forEach((attr) => {
                            getItem(attr, childItem.values)
                        })
                        tempItem.values.push(childItem)
                    }
                    resultContainer.push(tempItem)
                } else {
                    // hash object
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        title: output.description,
                        values: [],
                        valueType: output.isArray ? 'array' : 'object',
                        childValueType: childValueType
                    })
                    if (output.isArray) {
                        let childItem = Object.assign({}, itemTemplate, {
                            value: '[[array item]]',
                            keyVisible: false,
                            values: [],
                            valueType: childValueType
                        })
                        tempItem.values.push(childItem)
                        attributes.forEach((attr) => {
                            getItem(attr, childItem.values)
                        })
                    } else {
                        attributes.forEach((attr) => {
                            getItem(attr, tempItem.values)
                        })
                    }
                    resultContainer.push(tempItem)
                }
            }
        }
        let getData = (outputs) => {
            let paramsInfo = this.getNEIParamsInfo(outputs, dataSource)
            if (paramsInfo.valueType === 'object') {
                // json object
                outputs.forEach((output) => {
                    getItem(output, result)
                    for (let i = 0; i < traversedLayers; i++) {
                        traversedDataTypes.pop()
                    }
                    traversedLayers = 0
                })
            } else {
                if (paramsInfo.valueType === 'array') {
                    // json array
                    let item = Object.assign({}, itemTemplate, {
                        key: '[[array]]',
                        title: outputs[0].description,
                        values: [],
                        valueType: 'array',
                        childValueType: paramsInfo.childValueType
                    })
                    if (paramsInfo.childValueType === 'object') {
                        // array's element is object
                        let objItem = Object.assign({}, itemTemplate, {
                            key: '[[array item]]',
                            values: [],
                            valueType: paramsInfo.childValueType
                        })
                        paramsInfo.values.forEach((obj) => {
                            getItem(obj, objItem.values)
                        })
                        item.values.push(objItem)
                    }
                    result.push(item)
                } else {
                    // json primitive
                    let primitiveItem = Object.assign({}, itemTemplate, {
                        key: `[[${paramsInfo.valueType}]]`,
                        values: [],
                        valueType: paramsInfo.valueType
                    })
                    result.push(primitiveItem)
                }
            }
        }
        getData(request.outputs)
        return error || result
    },

    checkResponseResult(resChecker, resData) {
        let getOrderExp = (index) => {
            let lastNum = String(index).substr(-1)
            switch (lastNum) {
                case '1':
                    return index + 'st'

                case '2':
                    return index + 'nd'

                case '3':
                    return index + 'rd'

                default:
                    return index + 'th'

            }
        }
        let checkJSONObj = (checker, data) => {
            let keyPaths = []
            let getKeyPath = (key) => {
                return keyPaths.length ? (keyPaths.join(' -> ') + ' -> ' + key) : key
            }
            let checkData = (checker, data) => {
                for (let i = 0, l = checker.length; i < l; i++) {
                    let rc = checker[i]
                    let key = rc.key
                    if (!key || !rc.checked) {
                        continue
                    }
                    if (data.hasOwnProperty(key)) {
                        if (rc.valueType === 'variable') {
                            continue
                        }
                        let resultKeyType = Array.isArray(data[key]) ? 'array' : typeof data[key]
                        if (resultKeyType === rc.valueType) {
                            if (resultKeyType === 'array') {
                                if (rc.childValueType === 'object') {
                                    keyPaths.push(key)
                                    for (let j = 0, m = data[key].length; j < m; j++) {
                                        let tempResult = checkData(rc.values, data[key][j])
                                        if (tempResult) {
                                            return tempResult
                                        }
                                    }
                                    keyPaths.pop()
                                } else if (rc.childValueType === 'parent') {
                                    // every element should be same as parent, this is mainly for checking `tree-like` data
                                    keyPaths.push(key)
                                    for (let j = 0, m = data[key].length; j < m; j++) {
                                        let tempResult = checkData(checker, data[key][j])
                                        if (tempResult) {
                                            return tempResult
                                        }
                                    }
                                    keyPaths.pop()
                                } else {
                                    // child value type is `string` or `number` or `boolean`
                                    for (let j = 0, m = data[key].length; j < m; j++) {
                                        let type = typeof data[key][j]
                                        if (type !== rc.childValueType) {
                                            return {
                                                status: 'failed',
                                                info: `Field "${getKeyPath(key)}" is "array", every element should be "${rc.childValueType}", but it has "${type}" element`
                                            }
                                        }
                                    }
                                }
                            } else if (resultKeyType === 'object') {
                                keyPaths.push(key)
                                let tempResult = checkData(rc.valu, data[key])
                                keyPaths.pop()
                                if (tempResult) {
                                    return tempResult
                                }
                            }
                        } else {
                            return {
                                status: 'failed',
                                info: `Field "${getKeyPath(key)}" should be "${rc.valueType}", but it is "${resultKeyType}"`
                            }
                        }
                    } else {
                        return {
                            status: 'failed',
                            info: `No such field: ${getKeyPath(key)}`
                        }
                    }
                }
            }
            return checkData(checker, data)
        }
        let checkResult
        let resDataType = typeof(resData)
        if (resJSONType === 'array') {
            if (Array.isArray(resData)) {
                let childValueType = resChecker[0].childValueType
                if (childValueType === 'object') {
                    for (let i = 0, l = resData.length; i < l; i++) {
                        checkResult = checkJSONObj(resChecker[0].values, resData[i])
                        if (checkResult) {
                            checkResult.info = `Array's ${getOrderExp(i + 1)} element, ` + checkResult.info
                            break
                        }
                    }
                } else if (childValueType !== 'variable') {
                    // variable type check is skipped
                    for (let i = 0, l = resData.length; i < l; i++) {
                        let type = typeof (resData[i])
                        if (childValueType === 'parent') {
                            if (!Array.isArray(resData[i])) {
                                checkResult = {
                                    status: 'failed',
                                    info: `Array's ${getOrderExp(i + 1)} element should be "array", but it is "${type}"`
                                }
                                break
                            }
                        } else {
                            if (type !== childValueType) {
                                checkResult = {
                                    status: 'failed',
                                    info: `Array's ${getOrderExp(i + 1)} element should be "${childValueType}", but it is "${type}"`
                                }
                                break
                            }
                        }
                    }
                }
            } else {
                checkResult = {
                    status: 'failed',
                    info: `Result data type should be "array", but it is "${resDataType}"`
                }
            }
        } else if (resJSONType === 'object') {
            checkResult = checkJSONObj(resChecker, resData)
        } else if (resJSONType === 'null') {
            if (resData !== null) {
                checkResult = {
                    status: 'failed',
                    info: `Response data should be "null", but it is "${resDataType}"`
                }
            }
        } else {
            if (resDataType !== resJSONType) {
                checkResult = {
                    status: 'failed',
                    info: `Response data type should be "${resJSONType}", but it is "${resDataType}"`
                }
            }
        }
        // if check success, checkData is return `undefined`
        return checkResult || true
    },

    getNextActiveIndex(isActive, tabIndex, currentActiveIndex) {
        let nextActiveIndex
        if (isActive) {
            nextActiveIndex = Math.max(0, tabIndex - 1)
        } else if (tabIndex > currentActiveIndex) {
            nextActiveIndex = currentActiveIndex
        } else {
            nextActiveIndex = currentActiveIndex - 1
        }
        return nextActiveIndex
    },

    getJSONByValue(value) {
        let json
        try {
            json = JSON.parse(value)
        } catch (err) {
            try {
                json = eval('(' + value + ')')
            } catch (err) {
                //console.log(err)
            }
        }
        return json || value
    },

    addKVsByJSONRecurse(json, itemTemplate, container) {
        let getArrayChildValueType = (arr) => {
            let checkType = (type) => {
                for (let i = 0, l = arr.length; i < l; i++) {
                    // array is not taken into account
                    if (Array.isArray(arr[i])) {
                        return false
                    } else {
                        if (typeof arr[i] !== type) {
                            return false
                        }
                    }
                }
                return true
            }
            if (checkType('string')) {
                return 'string'
            }
            if (checkType('number')) {
                return 'number'
            }
            if (checkType('boolean')) {
                return 'boolean'
            }
            if (checkType('object')) {
                return 'object'
            }
            return null // all of array elements are not the same type
        }
        let setData = (json, con) => {
            _.forEachRight(json, (value, key) => {
                let item = Object.assign({}, itemTemplate, {
                    key: key
                })
                let type = typeof value
                item.values = []
                if (Array.isArray(value)) {
                    item.valueType = 'array'
                    let childValueType = getArrayChildValueType(value)
                    item.childValueType = childValueType || 'string'
                    item.valueReadonly = true
                    if (childValueType === 'object') {
                        let childItem = {
                            valueType: 'object',
                            keyVisible: false,
                            value: '[[array item]]',
                            valueReadonly: true
                        }
                        value.forEach((v) => {
                            let tempItem = Object.assign({}, childItem, {
                                values: [],
                                checked: true
                            })
                            item.values.push(tempItem)
                            setData(v, tempItem.values)
                        })
                    } else {
                        if (childValueType) {
                            let childItem = {
                                valueType: childValueType,
                                keyVisible: false
                            }
                            value.forEach((v) => {
                                let tempItem = Object.assign({}, childItem, {
                                    values: [],
                                    checked: true,
                                    value: v
                                })
                                item.values.push(tempItem)
                            })
                        } else {
                            // if all of array elements are not the same type, change it to 'string' type
                            item.valueType = 'string'
                        }
                    }
                } else if (type === 'object') {
                    item.valueType = 'object'
                    item.valueReadonly = true
                    let v = value
                    if (!Object.keys(v).length) {
                        v = {'': ''}
                    }
                    setData(v, item.values)
                } else {
                    item.valueType = type
                    item.value = value
                }
                con.unshift(item)
            })
        }
        setData(json, container)
    },

    addKVsByJSONFlat(json, itemTemplate, container) {
        let setData = (json) => {
            _.forEachRight(json, (value, key) => {
                let item = Object.assign({}, itemTemplate, {
                    key: key
                })
                let type = typeof value
                if (Array.isArray(value)) {
                    setData(value[0])
                } else if (type === 'object') {
                    setData(value)
                } else {
                    item.value = value
                }
                container.unshift(item)
            })
        }
        setData(json)
    },

    getValueByType(value, type) {
        // try to convert variable value type
        let getVarValue = () => {
            if (/^(\d+)$/.test(value)) {
                return this.getValueByType(value, 'number')
            }
            if (/^(true|false)$/.test(value)) {
                return this.getValueByType(value, 'boolean')
            }
            return this.getValueByType(value, 'string')
        }
        switch (type) {
            case 'string':
                return String(value)
            case 'number':
                return Number(value)
            case 'boolean':
                return value === 'true'
            case 'variable':
                return getVarValue()
            default:
                return value
        }
    },

    getNEIParamsInfo (params, dataSource) {
        let typeMap = {
            10000: 'variable',
            10001: 'string',
            10002: 'number',
            10003: 'boolean'
        }
        let result = {
            valueType: 'object',
            childValueType: null,
            values: [],
            dataTypeFormat: null
        }
        let first = params[0]
        if (first) {
            if (first.isPrimite) {
                if (first.isArray) {
                    result.valueType = 'array'
                } else {
                    result.valueType = typeMap[first.type]
                    if (!result.valueType) {
                        let dataType = _.find(dataSource.datatypes, (dt) => {
                            return dt.id === first.type
                        })
                        result.dataTypeFormat = dataType.format
                        // todo: nei has no enums datatype here
                        if (dataType.format === 2) {
                            // array
                            result.valueType = 'array'
                            let subDataType = _.find(dataSource.datatypes, (dt) => {
                                return dt.id === dataType.subtype
                            })
                            result.childValueType = typeMap[subDataType.id]
                            if (!result.childValueType) {
                                result.childValueType = 'object'
                                result.values = _.filter(dataSource.attributes, (attr) => {
                                    return attr.parentId === subDataType.id
                                })
                            }
                        }
                    }
                }
            }
        }
        return result
    }
}

export default Util