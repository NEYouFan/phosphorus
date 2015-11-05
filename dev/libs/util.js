//author @huntbao
'use strict'

import URL from 'url'
import UUID from 'node-uuid'
import async from 'async'
import QueryString from 'querystring'

const DEFAULT_PATH_VARIABLE_PLACEHOLDER = 'Path Variable Key'
const pathVariableExp = new RegExp('/:(\\w+?[^/]*)', 'g')
//const queryExp = new RegExp('(\\w+)=(\\w+)|(\\w+)=*|=*(\\w+)', 'g')

let Util = {

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

    setUrlQuery(url, params) {
        let result = URL.parse(url)
        result.search = '' // URL.format: query (object; see querystring) will only be used if search is absent.
        result.query = this.getQuery(params)
        return URL.format(result)
    },

    getQuery(params) {
        let query = {}
        params.map((param, index) => {
            if (param.readonly) return
            if ((!param.key && !param.value) || !param.checked) return
            if (!query[param.key]) {
                query[param.key] = []
            }
            query[param.key].push(param.value || '')
        })
        return query
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

    fetchNEICollections(neiServerUrl, callback) {
        let projectGroupUrl = neiServerUrl + '/api/projGroup/getProList'
        let projectUrl = neiServerUrl + '/api/projectView/getByProjectId?pid='
        let fetchOptions = {
            credentials: 'include',
            method: 'POST'
        }
        let res
        let collections = []
        let convertData = (projectGroups, projects) => {
            projectGroups = [
                {
                    "id": 10207,
                    "name": "TEST",
                    "creatorId": 10011,
                    "type": 0,
                    "fromUsrGroup": "0",
                    "creatorName": "BYM",
                    "projects": [
                        {
                            "id": 10597,
                            "name": "Not Delete",
                            "type": 0,
                            "creatorId": 10011,
                            "creatorName": "BYM",
                            "qbsId": 0
                        },
                        {
                            "id": 10484,
                            "name": "Public Sources",
                            "type": 1,
                            "creatorId": 10011,
                            "creatorName": "BYM",
                            "qbsId": 0
                        }
                    ]
                },
                {
                    "id": 10088,
                    "name": "Default Group",
                    "creatorId": 10011,
                    "type": 1,
                    "fromUsrGroup": "0",
                    "creatorName": "BYM",
                    "projects": [
                        {
                            "id": 10182,
                            "name": "Public Sources",
                            "type": 1,
                            "creatorId": 10011,
                            "creatorName": "BYM",
                            "qbsId": 0
                        }
                    ]
                }
            ]
            projects = {
                "10182": {
                    "pages": [],
                    "interfaces": [],
                    "templates": [],
                    "datatypes": [
                        {
                            "id": 10000,
                            "name": "Variable",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10001,
                            "name": "String",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10002,
                            "name": "Number",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10003,
                            "name": "Boolean",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10124,
                            "name": "Member",
                            "format": 0,
                            "updateTime": 1439292626000
                        }
                    ],
                    "attributes": [
                        {
                            "id": 10394,
                            "name": "2323",
                            "type": 10001,
                            "isArray": 0,
                            "description": "223",
                            "parentId": 10124
                        },
                        {
                            "id": 10395,
                            "name": "223",
                            "type": 10001,
                            "isArray": 0,
                            "description": "2332",
                            "parentId": 10124
                        }
                    ],
                    "project": {
                        "id": 10182,
                        "name": "公共资源库",
                        "group": "默认分组"
                    },
                    "timestamp": 1446627522217
                },
                "10484": {
                    "pages": [],
                    "interfaces": [],
                    "templates": [],
                    "datatypes": [
                        {
                            "id": 10000,
                            "name": "Variable",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10001,
                            "name": "String",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10002,
                            "name": "Number",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10003,
                            "name": "Boolean",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10503,
                            "name": "ArrayTest",
                            "format": 2,
                            "updateTime": 1444965243000
                        },
                        {
                            "id": 10509,
                            "name": "Parameter",
                            "format": 0,
                            "updateTime": 1444981770000
                        }
                    ],
                    "attributes": [
                        {
                            "id": 10626,
                            "name": "id",
                            "type": 10002,
                            "isArray": 0,
                            "description": "参数id",
                            "parentId": 10509
                        },
                        {
                            "id": 10627,
                            "name": "name",
                            "type": 10002,
                            "isArray": 0,
                            "description": "参数名称",
                            "parentId": 10509
                        },
                        {
                            "id": 10649,
                            "name": "parameter",
                            "type": 10509,
                            "isArray": 1,
                            "description": "a",
                            "parentId": 10509
                        }
                    ],
                    "project": {
                        "id": 10484,
                        "name": "公共资源库",
                        "group": "测试"
                    },
                    "timestamp": 1446627522150
                },
                "10597": {
                    "pages": [
                        {
                            "id": 10072,
                            "path": "/x/xx222",
                            "name": "page1",
                            "templates": [
                                10159
                            ],
                            "interfaces": [
                                10542
                            ],
                            "description": "4444",
                            "parameters": [
                                {
                                    "id": 12026,
                                    "name": "aa",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1444356880000
                                },
                                {
                                    "id": 12027,
                                    "name": "bb",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1444356880000
                                },
                                {
                                    "id": 12707,
                                    "name": "ccc",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "ccc",
                                    "updateTime": 1444718525000
                                },
                                {
                                    "id": 13115,
                                    "name": "ddd",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445219782000
                                }
                            ],
                            "updateTime": 1446627358000
                        },
                        {
                            "id": 10073,
                            "path": "/x/x/x",
                            "name": "page2",
                            "templates": [
                                10159
                            ],
                            "interfaces": [],
                            "description": "",
                            "parameters": [
                                {
                                    "id": 12028,
                                    "name": "aa",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1444356923000
                                },
                                {
                                    "id": 12029,
                                    "name": "xx",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1444356923000
                                }
                            ],
                            "updateTime": 1446627361000
                        },
                        {
                            "id": 10082,
                            "path": "/aaaa/dddd",
                            "name": "page3",
                            "templates": [
                                10134,
                                10159
                            ],
                            "interfaces": [
                                10599,
                                10616
                            ],
                            "description": "1111ddd",
                            "parameters": [
                                {
                                    "id": 13116,
                                    "name": "111",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "111",
                                    "updateTime": 1445219985000
                                },
                                {
                                    "id": 13117,
                                    "name": "1112",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "111",
                                    "updateTime": 1445219985000
                                },
                                {
                                    "id": 10612,
                                    "datatypeId": 10502,
                                    "datatypeName": "HashTest",
                                    "projectId": 10597,
                                    "name": "aa",
                                    "originalType": 10001,
                                    "type": 10001,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1445258010000
                                },
                                {
                                    "id": 10613,
                                    "datatypeId": 10502,
                                    "datatypeName": "HashTest",
                                    "projectId": 10597,
                                    "name": "bb",
                                    "originalType": 10002,
                                    "type": 10002,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "bb",
                                    "updateTime": 1445258010000
                                },
                                {
                                    "id": 10614,
                                    "datatypeId": 10502,
                                    "datatypeName": "HashTest",
                                    "projectId": 10597,
                                    "name": "cc",
                                    "originalType": 10003,
                                    "type": 10003,
                                    "typeName": "Boolean",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "cc",
                                    "updateTime": 1445258010000
                                },
                                {
                                    "id": 10626,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "id",
                                    "originalType": 10002,
                                    "type": 10002,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "参数id",
                                    "updateTime": 1445258019000
                                },
                                {
                                    "id": 10627,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "name",
                                    "originalType": 10002,
                                    "type": 10002,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "参数名称",
                                    "updateTime": 1445258019000
                                },
                                {
                                    "id": 10649,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "parameter",
                                    "originalType": 10509,
                                    "type": 10509,
                                    "typeName": "Parameter",
                                    "isSysType": 0,
                                    "isArray": 1,
                                    "description": "a",
                                    "updateTime": 1445258019000
                                },
                                {
                                    "id": 10647,
                                    "datatypeId": 10514,
                                    "datatypeName": "OrderForm",
                                    "projectId": 10597,
                                    "name": "goods",
                                    "originalType": 10512,
                                    "type": 10512,
                                    "typeName": "OrderFormGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445258041000
                                },
                                {
                                    "id": 10648,
                                    "datatypeId": 10514,
                                    "datatypeName": "OrderForm",
                                    "projectId": 10597,
                                    "name": "activityGoods",
                                    "originalType": 10513,
                                    "type": 10513,
                                    "typeName": "OrderFormActivityGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445258041000
                                }
                            ],
                            "updateTime": 1446627365000
                        }
                    ],
                    "interfaces": [
                        {
                            "id": 10599,
                            "name": "获取购物车商品",
                            "description": "",
                            "path": "/a/test",
                            "method": 0,
                            "isResth": 0,
                            "inputs": [
                                {
                                    "id": 12890,
                                    "name": "cartOrderForm",
                                    "type": 10514,
                                    "isPrimite": 0,
                                    "typeName": "OrderForm",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444815231000
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 12898,
                                    "name": "cartOrderFormOut",
                                    "type": 10516,
                                    "isPrimite": 0,
                                    "typeName": "OrderForm2",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444873889000
                                }
                            ],
                            "updateTime": 1444815175000
                        },
                        {
                            "id": 10566,
                            "name": "MyApiTest",
                            "description": "",
                            "path": "/api/interface/update",
                            "method": 0,
                            "isResth": 0,
                            "inputs": [
                                {
                                    "id": 12391,
                                    "name": "id",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "接口id",
                                    "updateTime": 1444642553000
                                },
                                {
                                    "id": 12392,
                                    "name": "inputList",
                                    "type": 10509,
                                    "isPrimite": 0,
                                    "typeName": "Parameter",
                                    "isSysType": 0,
                                    "isArray": 1,
                                    "description": "参数对象，{id: xxx}",
                                    "updateTime": 1444643630000
                                }
                            ],
                            "outputs": [],
                            "updateTime": 1444642553000
                        },
                        {
                            "id": 10542,
                            "name": "Search",
                            "description": "",
                            "path": "/api/ndir/search",
                            "method": 0,
                            "isResth": 0,
                            "inputs": [
                                {
                                    "id": 12144,
                                    "name": "pid",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444382256000
                                },
                                {
                                    "id": 12145,
                                    "name": "offset",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444382256000
                                },
                                {
                                    "id": 12146,
                                    "name": "limit",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444382256000
                                },
                                {
                                    "id": 12147,
                                    "name": "key",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444382256000
                                },
                                {
                                    "id": 12148,
                                    "name": "table",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444466219000
                                },
                                {
                                    "id": 12149,
                                    "name": "type",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444466230000
                                },
                                {
                                    "id": 12150,
                                    "name": "isExact",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444466233000
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 12151,
                                    "name": "code",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444382256000
                                },
                                {
                                    "id": 12152,
                                    "name": "msg",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444465868000
                                },
                                {
                                    "id": 12153,
                                    "name": "result",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 1,
                                    "description": "",
                                    "updateTime": 1444465871000
                                }
                            ],
                            "updateTime": 1445225058000
                        },
                        {
                            "id": 10616,
                            "name": "SearchOfBaseType",
                            "description": "",
                            "path": "/api/ndir/searchg",
                            "method": 4,
                            "isResth": 0,
                            "inputs": [
                                {
                                    "id": 13128,
                                    "name": "222",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "222",
                                    "updateTime": 1445225166000
                                },
                                {
                                    "id": 10626,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "id",
                                    "originalType": 10002,
                                    "type": 10002,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "参数id",
                                    "updateTime": 1445236329000
                                },
                                {
                                    "id": 10627,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "name",
                                    "originalType": 10002,
                                    "type": 10002,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "参数名称",
                                    "updateTime": 1445236329000
                                },
                                {
                                    "id": 10649,
                                    "datatypeId": 10509,
                                    "datatypeName": "Parameter",
                                    "projectId": 10484,
                                    "name": "parameter",
                                    "originalType": 10509,
                                    "type": 10509,
                                    "typeName": "Parameter",
                                    "isSysType": 0,
                                    "isArray": 1,
                                    "description": "a",
                                    "updateTime": 1445236329000
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 10645,
                                    "datatypeId": 10513,
                                    "datatypeName": "OrderFormActivityGoods",
                                    "projectId": 10597,
                                    "name": "goods",
                                    "originalType": 10512,
                                    "type": 10512,
                                    "typeName": "OrderFormGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445305170000
                                },
                                {
                                    "id": 10646,
                                    "datatypeId": 10513,
                                    "datatypeName": "OrderFormActivityGoods",
                                    "projectId": 10597,
                                    "name": "huanGouGiftGoods",
                                    "originalType": 10512,
                                    "type": 10512,
                                    "typeName": "OrderFormGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445305170000
                                }
                            ],
                            "updateTime": 1445225210000
                        },
                        {
                            "id": 10657,
                            "name": "TestIn",
                            "description": "",
                            "path": "/app/topics/0001124J/childtopics",
                            "method": 1,
                            "isResth": 0,
                            "inputs": [
                                {
                                    "id": 13240,
                                    "name": "size",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445392965000
                                },
                                {
                                    "id": 13241,
                                    "name": "offset",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445392965000
                                }
                            ],
                            "outputs": [
                                {
                                    "id": 13243,
                                    "name": "msg",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445397190000
                                },
                                {
                                    "id": 13244,
                                    "name": "resultcode",
                                    "type": 10002,
                                    "isPrimite": 0,
                                    "typeName": "Number",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1445397202000
                                }
                            ],
                            "updateTime": 1445392965000
                        }
                    ],
                    "templates": [
                        {
                            "id": 10134,
                            "path": "/page/test.ftl",
                            "name": "33333",
                            "description": "aaa",
                            "parameters": [
                                {
                                    "id": 11143,
                                    "name": "aaa",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "aaaa",
                                    "updateTime": 1441955456000
                                },
                                {
                                    "id": 11144,
                                    "name": "sdf",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "fds",
                                    "updateTime": 1441955456000
                                },
                                {
                                    "id": 12708,
                                    "name": "bbb",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "bbb",
                                    "updateTime": 1444718538000
                                },
                                {
                                    "id": 12808,
                                    "name": "aaam",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444728628000
                                },
                                {
                                    "id": 12809,
                                    "name": "ccc",
                                    "type": 10001,
                                    "isPrimite": 0,
                                    "typeName": "String",
                                    "isSysType": 1,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444728634000
                                }
                            ],
                            "updateTime": 1441955456000
                        },
                        {
                            "id": 10159,
                            "path": "/page/xtest.ftl",
                            "name": "test",
                            "description": "xyz",
                            "parameters": [
                                {
                                    "id": 11596,
                                    "name": "xx",
                                    "type": 10511,
                                    "isPrimite": 0,
                                    "typeName": "cartOrderForm",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "{\"key\":\"value\",\"xx\":\"xx\"}",
                                    "updateTime": 1444992224000
                                },
                                {
                                    "id": 13100,
                                    "name": "param",
                                    "type": 10509,
                                    "isPrimite": 0,
                                    "typeName": "Parameter",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444992274000
                                },
                                {
                                    "id": 13101,
                                    "name": "aa",
                                    "type": 10509,
                                    "isPrimite": 0,
                                    "typeName": "Parameter",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "aa",
                                    "updateTime": 1444992294000
                                },
                                {
                                    "id": 10647,
                                    "datatypeId": 10514,
                                    "datatypeName": "OrderForm",
                                    "projectId": 10597,
                                    "name": "goods",
                                    "originalType": 10512,
                                    "type": 10512,
                                    "typeName": "OrderFormGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444992304000
                                },
                                {
                                    "id": 10648,
                                    "datatypeId": 10514,
                                    "datatypeName": "OrderForm",
                                    "projectId": 10597,
                                    "name": "activityGoods",
                                    "originalType": 10513,
                                    "type": 10513,
                                    "typeName": "OrderFormActivityGoods",
                                    "isSysType": 0,
                                    "isArray": 0,
                                    "description": "",
                                    "updateTime": 1444992304000
                                }
                            ],
                            "updateTime": 1442820586000
                        }
                    ],
                    "datatypes": [
                        {
                            "id": 10000,
                            "name": "Variable",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10001,
                            "name": "String",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10002,
                            "name": "Number",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10003,
                            "name": "Boolean",
                            "format": 0,
                            "updateTime": 1438067940000
                        },
                        {
                            "id": 10503,
                            "name": "ArrayTest",
                            "format": 2,
                            "updateTime": 1444965243000
                        },
                        {
                            "id": 10525,
                            "name": "AttributeTest",
                            "format": 0,
                            "updateTime": 1444960667000
                        },
                        {
                            "id": 10511,
                            "name": "cartOrderForm",
                            "format": 0,
                            "updateTime": 1444815028000
                        },
                        {
                            "id": 10501,
                            "name": "EnumeTest",
                            "format": 1,
                            "updateTime": 1444382730000
                        },
                        {
                            "id": 10502,
                            "name": "HashTest",
                            "format": 0,
                            "updateTime": 1444382777000
                        },
                        {
                            "id": 10534,
                            "name": "Menu",
                            "format": 0,
                            "updateTime": 1445338823000
                        },
                        {
                            "id": 10514,
                            "name": "OrderForm",
                            "format": 0,
                            "updateTime": 1444815211000
                        },
                        {
                            "id": 10516,
                            "name": "OrderForm2",
                            "format": 0,
                            "updateTime": 1444873835000
                        },
                        {
                            "id": 10523,
                            "name": "OrderForm3",
                            "format": 0,
                            "updateTime": 1444960164000
                        },
                        {
                            "id": 10524,
                            "name": "OrderForm4",
                            "format": 0,
                            "updateTime": 1444960221000
                        },
                        {
                            "id": 10513,
                            "name": "OrderFormActivityGoods",
                            "format": 0,
                            "updateTime": 1444815113000
                        },
                        {
                            "id": 10512,
                            "name": "OrderFormGoods",
                            "format": 0,
                            "updateTime": 1444983127000
                        },
                        {
                            "id": 10509,
                            "name": "Parameter",
                            "format": 0,
                            "updateTime": 1444981770000
                        },
                        {
                            "id": 10529,
                            "name": "pc栏目数据VO",
                            "format": 0,
                            "updateTime": 1445234985000
                        },
                        {
                            "id": 10535,
                            "name": "RefTester",
                            "format": 0,
                            "updateTime": 1445410313000
                        },
                        {
                            "id": 10528,
                            "name": "RestultCode",
                            "format": 0,
                            "updateTime": 1445410677000
                        },
                        {
                            "id": 10540,
                            "name": "te",
                            "format": 0,
                            "updateTime": 1446084829000
                        }
                    ],
                    "attributes": [
                        {
                            "id": 10709,
                            "name": "aa",
                            "type": 10002,
                            "isArray": 0,
                            "description": "aa",
                            "parentId": 10525
                        },
                        {
                            "id": 10642,
                            "name": "goods",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10511
                        },
                        {
                            "id": 10643,
                            "name": "activityGoods",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10511
                        },
                        {
                            "id": 10644,
                            "name": "goodsId",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10512
                        },
                        {
                            "id": 10645,
                            "name": "goods",
                            "type": 10512,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10513
                        },
                        {
                            "id": 10646,
                            "name": "huanGouGiftGoods",
                            "type": 10512,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10513
                        },
                        {
                            "id": 10708,
                            "name": "goods",
                            "type": 10523,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10524
                        },
                        {
                            "id": 10728,
                            "name": "resultcode",
                            "type": 10002,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10528
                        },
                        {
                            "id": 10729,
                            "name": "msg",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10528
                        },
                        {
                            "id": 10730,
                            "name": "data",
                            "type": 10529,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10528
                        },
                        {
                            "id": 10731,
                            "name": "topicname",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10529
                        },
                        {
                            "id": 10732,
                            "name": "topicid",
                            "type": 10001,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10529
                        },
                        {
                            "id": 10733,
                            "name": "level",
                            "type": 10002,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10529
                        },
                        {
                            "id": 10734,
                            "name": "children",
                            "type": 10528,
                            "isArray": 1,
                            "description": "",
                            "parentId": 10529
                        },
                        {
                            "id": 10626,
                            "name": "id",
                            "type": 10002,
                            "isArray": 0,
                            "description": "参数id",
                            "parentId": 10509
                        },
                        {
                            "id": 10627,
                            "name": "name",
                            "type": 10002,
                            "isArray": 0,
                            "description": "参数名称",
                            "parentId": 10509
                        },
                        {
                            "id": 10649,
                            "name": "parameter",
                            "type": 10509,
                            "isArray": 1,
                            "description": "a",
                            "parentId": 10509
                        },
                        {
                            "id": 10707,
                            "name": "goods",
                            "type": 10524,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10523
                        },
                        {
                            "id": 10652,
                            "name": "goods",
                            "type": 10512,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10516
                        },
                        {
                            "id": 10653,
                            "name": "activityGoods",
                            "type": 10516,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10516
                        },
                        {
                            "id": 10647,
                            "name": "goods",
                            "type": 10512,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10514
                        },
                        {
                            "id": 10648,
                            "name": "activityGoods",
                            "type": 10513,
                            "isArray": 0,
                            "description": "",
                            "parentId": 10514
                        },
                        {
                            "id": 10744,
                            "name": "menu",
                            "type": 10534,
                            "isArray": 1,
                            "description": "",
                            "parentId": 10534
                        },
                        {
                            "id": 10612,
                            "name": "aa",
                            "type": 10001,
                            "isArray": 0,
                            "description": "aa",
                            "parentId": 10502
                        },
                        {
                            "id": 10613,
                            "name": "bb",
                            "type": 10002,
                            "isArray": 0,
                            "description": "bb",
                            "parentId": 10502
                        },
                        {
                            "id": 10614,
                            "name": "cc",
                            "type": 10003,
                            "isArray": 0,
                            "description": "cc",
                            "parentId": 10502
                        },
                        {
                            "id": 10610,
                            "name": "bb",
                            "type": 10000,
                            "isArray": 0,
                            "description": "bb",
                            "parentId": 10501
                        },
                        {
                            "id": 10611,
                            "name": "cc",
                            "type": 10000,
                            "isArray": 0,
                            "description": "cc",
                            "parentId": 10501
                        }
                    ],
                    "project": {
                        "id": 10597,
                        "name": "勿删",
                        "group": "测试"
                    },
                    "timestamp": 1446627522073
                }
            }
            let methodMap = {
                0: 'POST',
                1: 'GET',
                2: 'PUT',
                3: 'DELETE',
                4: 'HEAD'
            }
            projectGroups.forEach((pg) => {
                let collection = {
                    id: UUID.v1(),
                    host: '', // all requests' host, could be override by folder's host
                    name: pg.name,
                    attributes: [],
                    datatypes: [],
                    folders: [],
                    requests: []
                }
                pg.projects.forEach((p) => {
                    let folder = {
                        id: UUID.v1(),
                        name: p.name,
                        orders: []
                    }
                    projects[p.id].interfaces.forEach((inter) => {
                        let request = {
                            id: UUID.v1(),
                            path: inter.path,
                            host: '', // folder's requests' host
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
        }
        convertData()
        console.log(collections)
        callback(collections, res)
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
                convertData(projectGroups, projects)
                callback(results, res)
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
    }
}

export default Util