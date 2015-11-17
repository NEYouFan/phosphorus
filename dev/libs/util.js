//author @huntbao
'use strict'

import URL from 'url'
import async from 'async'
import QueryString from 'querystring'
import _ from 'lodash'
import TestData from './collection_test_data'

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
                    inputs: inter.inputs,
                    outputs: inter.outputs,
                    folderId: null,
                    collectionId: collection.id
                }
                collection.requests.push(request)
            })
            callback(collection, res)
        }
        fetch(projectUrl + pId, fetchOptions).then((response) => {
            return response.json()
        }).then((json) => {
            convertDataAndReturn(json.result)
        })
    },

    isNoBodyMethod(method) {
        return /^(get|copy|head|purge|unlock|view)$/.test(method.toLowerCase())
    },

    convertNEIInputsToJSON(request, dataSource, savedData) {
        let result = {}
        let getPrimiteValue = (type, value) => {
            switch (type) {
                case 10001:
                    // string
                    return String(value)
                case 10002:
                    // number
                    return Number(value)
                case 10003:
                    // boolean
                    return Boolean(value)
                default:
                    return value
            }
        }
        let typeMap = {
            10001: 'string',
            10002: 'number',
            10003: 'boolean'
        }
        let checkValueIsType = (value, type) => {
            return typeof(value) === typeMap[type]
        }
        let isAllValueValidType = (arr, type) => {
            if (Array.isArray(arr)) {
                let result = true
                arr.forEach((value) => {
                    result = checkValueIsType(value, type)
                })
                return result
            } else {
                return false
            }
        }
        let isSysType = (type) => {
            return /^(10001|10002|10003)$/.test(type)
        }

        let traversedDataTypes = []
        let traversedLayers = 0
        let getInputValue = (input, data) => {
            let tempResult = {}
            if (input.isSysType) {
                if (input.isArray) {
                    if (isAllValueValidType(data[input.name], input.type)) {
                        tempResult = data[input.name]
                    } else {
                        tempResult = []
                    }
                } else {
                    if (checkValueIsType(data[input.name], input.type)) {
                        tempResult = data[input.name]
                    } else {
                        tempResult = getPrimiteValue(input.type, '')
                    }
                }
            } else {
                if (traversedDataTypes.indexOf(input.type) !== -1) {
                    // circular reference
                    let datatype = _.find(dataSource.datatypes, (dt) => {
                        return dt.id === input.type
                    })
                    // return data[input.name] || 'Circular reference: <' + datatype.name + '>'
                    return 'Circular reference: <' + datatype.name + '>'
                }
                traversedDataTypes.push(input.type)
                traversedLayers++
                let attributes = []
                dataSource.attributes.forEach((ds) => {
                    if (ds.parentId === input.type) {
                        attributes.push(ds)
                    }
                })
                attributes.forEach((attr) => {
                    attr.isSysType = isSysType(attr.type)
                    tempResult[attr.name] = getInputValue(attr, data[input.name] || {})
                })
            }
            return tempResult
        }
        let getData = (inputs, data) => {
            inputs.forEach((input) => {
                if (input.isPrimite) {
                    result = getPrimiteValue(input.type, data || '')
                } else {
                    for (let i = 0; i < traversedLayers; i++) {
                        traversedDataTypes.pop()
                    }
                    traversedLayers = 0
                    result[input.name] = getInputValue(input, data || {})
                }
            })
        }

        try {
            savedData = JSON.parse(savedData)
        } catch (err) {
            savedData = {}
        }
        getData(request.inputs, savedData)
        return JSON.stringify(result, null, '\t')
    },

    convertNEIOutputsToJSON(request, dataSource, itemTemplate) {
        let result = []
        let error = false
        let isSysType = (type) => {
            return /^(10001|10002|10003)$/.test(type)
        }
        let typeMap = {
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
                    value: [],
                    valueType: typeMap[output.type]
                })
                resultContainer.push(tempItem)
            } else {
                if (traversedDataTypes.indexOf(output.type) !== -1) {
                    // circular reference
                    let valueType
                    if (output.type === traversedDataTypes[traversedDataTypes.length - 1]) {
                        valueType = 'parent'
                    } else {
                        error = 'Circular Reference'
                    }
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        value: [],
                        valueType: valueType
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
                if (dataType.format === 1) {
                    //enums
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        value: [],
                        valueType: getEnumType(attributes[0].name)// all enums has same type, just judge the first element
                    })
                    resultContainer.push(tempItem)
                } else {
                    let tempItem = Object.assign({}, itemTemplate, {
                        key: output.name,
                        value: [],
                        valueType: output.isArray ? 'array' : 'object'
                    })
                    resultContainer.push(tempItem)
                    attributes.forEach((attr) => {
                        getItem(attr, tempItem.value)
                    })
                }
            }
        }
        let getData = (outputs) => {
            outputs.forEach((output) => {
                getItem(output, result)
                for (let i = 0; i < traversedLayers; i++) {
                    traversedDataTypes.pop()
                }
                traversedLayers = 0
            })
        }
        getData(request.outputs)
        return error || result
    },

    checkResponseResult(resChecker, resData) {
        if (resChecker.length === 0) {
            return false
        }
        if (typeof resData !== 'object' || Array.isArray(resData)) {
            return false
        }
        let checkData = (checker, data) => {
            for (let i = 0, l = checker.length; i < l; i++) {
                let rc = checker[i]
                let key = rc.key
                if (data.hasOwnProperty(key)) {
                    let resultKeyType = Array.isArray(data[key]) ? 'array' : typeof data[key]
                    if (resultKeyType === rc.valueType) {
                        if (resultKeyType === 'array') {
                            for (let j = 0, m = data[key].length; j < m; j++) {
                                let tempResult = checkData(rc.value, data[key][j])
                                if (tempResult) {
                                    return tempResult
                                }
                            }
                        } else if (resultKeyType === 'object') {
                            let tempResult = checkData(rc.value, data[key])
                            if (tempResult) {
                                return tempResult
                            }
                        }
                    } else {
                        return {
                            status: 'failed',
                            info: `Field "${key}"'s type should be "${rc.valueType}", but it is "${resultKeyType}"`
                        }
                    }
                } else {
                    return {
                        status: 'failed',
                        info: `No such field: ${key}`
                    }
                }
            }
        }
        // if check success, checkData is return `undefined`
        let checkResult = checkData(resChecker, resData)
        return checkResult || true
    }
}

export default Util