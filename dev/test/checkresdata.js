'use strict'

let resChecker = [
    {
        key: 'id',
        checked: true,
        valueType: 'number',
        values: []
    },
    {
        key: 'tree',
        checked: true,
        valueType: 'array',
        childValueType: 'parent',
        values: []
    }
]

let resData = {
    id: 44,
    tree: [
        {
            id: 2222,
            tree: [
                {
                    id: 3333,
                    tree: []
                }
            ]
        },
        {
            id: 111,
            tree: []
        }
    ]
}

let checkResponseResult = () => {
    if (resChecker.length === 0) {
        return false
    }
    if (typeof resData !== 'object' || Array.isArray(resData)) {
        return false
    }
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
    // if check success, checkData is return `undefined`
    let checkResult = checkData(resChecker, resData)
    return checkResult || true
}

let testdata = {"collections":[{"attributes":[{"defaultValue":"","description":"叶子id","id":10889,"isArray":0,"name":"id","parentId":10585,"type":10001,"vkey":""},{"defaultValue":"","description":"叶子名称","id":10890,"isArray":0,"name":"name","parentId":10585,"type":10002,"vkey":""},{"defaultValue":"aa","description":"子叶子","id":10891,"isArray":0,"name":"tree","parentId":10585,"type":10585,"vkey":""},{"defaultValue":"","description":"","id":10997,"isArray":0,"name":"id","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10998,"isArray":0,"name":"name","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10999,"isArray":0,"name":"tag","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":11000,"isArray":0,"name":"subtype","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11001,"isArray":0,"name":"format","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11002,"isArray":0,"name":"description","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":11003,"isArray":0,"name":"projectId","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11004,"isArray":0,"name":"progroupId","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11005,"isArray":0,"name":"creatorId","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11006,"isArray":0,"name":"updatorId","parentId":10601,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":11007,"isArray":0,"name":"createTime","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":11008,"isArray":0,"name":"updateTime","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":11009,"isArray":0,"name":"updatorName","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":11010,"isArray":0,"name":"creatorName","parentId":10601,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10982,"isArray":0,"name":"creatorId","parentId":10595,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10983,"isArray":0,"name":"creatorName","parentId":10595,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10984,"isArray":0,"name":"fromUsrGroup","parentId":10595,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10985,"isArray":0,"name":"id","parentId":10595,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10986,"isArray":0,"name":"name","parentId":10595,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10987,"isArray":0,"name":"type","parentId":10595,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10988,"isArray":1,"name":"projects","parentId":10595,"type":10596,"vkey":""},{"defaultValue":"","description":"","id":10989,"isArray":0,"name":"creatorId","parentId":10596,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10990,"isArray":0,"name":"creatorName","parentId":10596,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10991,"isArray":0,"name":"id","parentId":10596,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10992,"isArray":0,"name":"name","parentId":10596,"type":10001,"vkey":""},{"defaultValue":"","description":"","id":10993,"isArray":0,"name":"qbsId","parentId":10596,"type":10002,"vkey":""},{"defaultValue":"","description":"","id":10994,"isArray":0,"name":"type","parentId":10596,"type":10002,"vkey":""}],"datatypes":[{"format":0,"id":10003,"name":"Boolean","subtype":0,"updateTime":1438067940000},{"format":0,"id":10002,"name":"Number","subtype":0,"updateTime":1438067940000},{"format":0,"id":10001,"name":"String","subtype":0,"updateTime":1438067940000},{"format":0,"id":10000,"name":"Variable","subtype":0,"updateTime":1438067940000},{"format":0,"id":10601,"name":"DataType","subtype":0,"updateTime":1448013159000},{"format":0,"id":10596,"name":"Project","subtype":0,"updateTime":1448013109000},{"format":0,"id":10595,"name":"ProjectGroup","subtype":0,"updateTime":1448013252000},{"format":0,"id":10585,"name":"Tree","subtype":0,"updateTime":1447991178000}],"folders":[],"host":"http://127.0.0.1","id":"10597","isNEI":true,"name":"勿删","requests":[{"collectionId":"10597","description":"","folderId":null,"headers":[],"id":10745,"inputs":[],"isNEI":true,"isRest":true,"method":"POST","name":"GetProject","outputs":[{"createTime":1448010088000,"defaultValue":"","description":"","id":13557,"isArray":0,"isPrimite":0,"isSysType":1,"name":"code","type":10002,"typeName":"Number","updateTime":1448010088000},{"createTime":1448010088000,"defaultValue":"","description":"","id":13558,"isArray":0,"isPrimite":0,"isSysType":1,"name":"msg","type":10001,"typeName":"String","updateTime":1448010088000},{"createTime":1448010088000,"defaultValue":"","description":"","id":13559,"isArray":1,"isPrimite":0,"isSysType":0,"name":"result","type":10596,"typeName":"Project","updateTime":1448012728000}],"path":"/api/import/getProject"},{"collectionId":"10597","description":"","folderId":null,"headers":[],"id":10747,"inputs":[{"createTime":1448010368000,"defaultValue":"","description":"","id":13563,"isArray":0,"isPrimite":0,"isSysType":1,"name":"isExact","type":10002,"typeName":"Number","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13564,"isArray":0,"isPrimite":0,"isSysType":1,"name":"key","type":10001,"typeName":"String","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13565,"isArray":0,"isPrimite":0,"isSysType":1,"name":"limit","type":10002,"typeName":"Number","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13566,"isArray":0,"isPrimite":0,"isSysType":1,"name":"offset","type":10002,"typeName":"Number","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13567,"isArray":0,"isPrimite":0,"isSysType":1,"name":"pid","type":10001,"typeName":"String","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13568,"isArray":0,"isPrimite":0,"isSysType":1,"name":"sortKey","type":10001,"typeName":"String","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13569,"isArray":0,"isPrimite":0,"isSysType":1,"name":"sortMethod","type":10001,"typeName":"String","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13570,"isArray":0,"isPrimite":0,"isSysType":1,"name":"table","type":10001,"typeName":"String","updateTime":1448010368000},{"createTime":1448010368000,"defaultValue":"","description":"","id":13571,"isArray":0,"isPrimite":0,"isSysType":1,"name":"type","type":10002,"typeName":"Number","updateTime":1448010368000}],"isNEI":true,"isRest":true,"method":"POST","name":"Search","outputs":[{"createTime":1448011599000,"defaultValue":"","description":"","id":13603,"isArray":0,"isPrimite":0,"isSysType":1,"name":"code","type":10002,"typeName":"Number","updateTime":1448011615000},{"createTime":1448011610000,"defaultValue":"","description":"","id":13605,"isArray":0,"isPrimite":0,"isSysType":1,"name":"msg","type":10001,"typeName":"String","updateTime":1448011610000},{"createTime":1448011674000,"defaultValue":"","description":"","id":13619,"isArray":1,"isPrimite":0,"isSysType":0,"name":"result","type":10601,"typeName":"DataType","updateTime":1448012886000}],"path":"/api/ndir/search"},{"collectionId":"10597","description":"","folderId":null,"headers":[],"id":10746,"inputs":[],"isNEI":true,"isRest":true,"method":"POST","name":"GetProList","outputs":[{"createTime":1448010169000,"defaultValue":"","description":"","id":13560,"isArray":0,"isPrimite":0,"isSysType":1,"name":"code","type":10002,"typeName":"Number","updateTime":1448010169000},{"createTime":1448010169000,"defaultValue":"","description":"","id":13561,"isArray":0,"isPrimite":0,"isSysType":1,"name":"msg","type":10001,"typeName":"String","updateTime":1448010169000},{"createTime":1448010169000,"defaultValue":"","description":"","id":13562,"isArray":1,"isPrimite":0,"isSysType":0,"name":"result","type":10595,"typeName":"ProjectGroup","updateTime":1448010290000}],"path":"/api/projGroup/getProList"}]}],"hosts":{"collections":{"10597":"http://127.0.0.1"},"folders":{}},"requests":{"10747":{"body_form_data":[],"body_raw_data":null,"body_raw_json":[{"checked":true,"key":"isExact","value":"0","value_readonly":false,"value_type":"number","values":[]},{"checked":true,"key":"key","value_readonly":false,"value_type":"string","values":[]},{"checked":true,"key":"limit","value":"50","value_readonly":false,"value_type":"number","values":[]},{"checked":true,"key":"offset","value":"0","value_readonly":false,"value_type":"number","values":[]},{"checked":true,"key":"pid","value":"10597","value_readonly":false,"value_type":"string","values":[]},{"checked":true,"key":"sortKey","value":"tag","value_readonly":false,"value_type":"string","values":[]},{"checked":true,"key":"sortMethod","value":"asc","value_readonly":false,"value_type":"string","values":[]},{"checked":true,"key":"table","value":"datatype","value_readonly":false,"value_type":"string","values":[]},{"checked":true,"key":"type","value_readonly":false,"value_type":"number","values":[]}],"body_type":{"name":"JSON(application/json)","type":"raw","value":"application/json"},"body_x_form_data":[],"id":10747,"is_nei":true,"method":"POST","name":"Search","url":"/api/ndir/search","url_params":[]}}}

console.log(checkResponseResult())
