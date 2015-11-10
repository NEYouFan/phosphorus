'use strict'

let result = {}

let dataSource = {

    "datatypes": [
        {
            "id": 10003,
            "name": "Boolean",
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
            "id": 10001,
            "name": "String",
            "format": 0,
            "updateTime": 1438067940000
        },
        {
            "id": 10000,
            "name": "Variable",
            "format": 0,
            "updateTime": 1438067940000
        },
        {
            "id": 10548,
            "name": "Interface",
            "format": 0,
            "updateTime": 1446793643000
        },
        {
            "id": 10545,
            "name": "Member",
            "format": 0,
            "updateTime": 1446791714000
        },
        {
            "id": 10543,
            "name": "Project",
            "format": 0,
            "updateTime": 1446791432000
        },
        {
            "id": 10542,
            "name": "ProjectGroup",
            "format": 0,
            "updateTime": 1446791438000
        },
        {
            "id": 10547,
            "name": "SearchParam",
            "format": 0,
            "updateTime": 1446793428000
        },
        {
            "id": 10544,
            "name": "UserGroup",
            "format": 0,
            "updateTime": 1446791689000
        }
    ],
    "attributes": [
        {
            "id": 10787,
            "name": "id",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10788,
            "name": "type",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10789,
            "name": "name",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10790,
            "name": "tag",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10791,
            "name": "path",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10792,
            "name": "method",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10793,
            "name": "isRest",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10794,
            "name": "description",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10795,
            "name": "projectId",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10796,
            "name": "progroupId",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10797,
            "name": "creatorId",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10798,
            "name": "updatorId",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10799,
            "name": "createTime",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10800,
            "name": "updateTime",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10801,
            "name": "username",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10802,
            "name": "creatorName",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10803,
            "name": "updatorName",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10804,
            "name": "projectName",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10548
        },
        {
            "id": 10775,
            "name": "uid",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10545
        },
        {
            "id": 10776,
            "name": "name",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10545
        },
        {
            "id": 10777,
            "name": "email",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10545
        },
        {
            "id": 10778,
            "name": "uGID",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10545
        },
        {
            "id": 10762,
            "name": "creatorId",
            "type": 10002,
            "isArray": 0,
            "description": "创建者id",
            "parentId": 10543
        },
        {
            "id": 10763,
            "name": "creatorName",
            "type": 10001,
            "isArray": 0,
            "description": "创建者姓名",
            "parentId": 10543
        },
        {
            "id": 10764,
            "name": "id",
            "type": 10002,
            "isArray": 0,
            "description": "项目id",
            "parentId": 10543
        },
        {
            "id": 10765,
            "name": "name",
            "type": 10001,
            "isArray": 0,
            "description": "项目名称",
            "parentId": 10543
        },
        {
            "id": 10766,
            "name": "qbsId",
            "type": 10002,
            "isArray": 0,
            "description": "qbs id",
            "parentId": 10543
        },
        {
            "id": 10767,
            "name": "type",
            "type": 10002,
            "isArray": 0,
            "description": "项目类型，1是公共资源库，0是创建的项目",
            "parentId": 10543
        },
        {
            "id": 10755,
            "name": "creatorId",
            "type": 10002,
            "isArray": 0,
            "description": "创建者id",
            "parentId": 10542
        },
        {
            "id": 10756,
            "name": "creatorName",
            "type": 10001,
            "isArray": 0,
            "description": "创建者姓名",
            "parentId": 10542
        },
        {
            "id": 10757,
            "name": "fromUsrGroup",
            "type": 10001,
            "isArray": 0,
            "description": "是否来自用户组",
            "parentId": 10542
        },
        {
            "id": 10758,
            "name": "id",
            "type": 10002,
            "isArray": 0,
            "description": "项目组id",
            "parentId": 10542
        },
        {
            "id": 10759,
            "name": "name",
            "type": 10001,
            "isArray": 0,
            "description": "项目组名称",
            "parentId": 10542
        },
        {
            "id": 10760,
            "name": "type",
            "type": 10002,
            "isArray": 0,
            "description": "项目组类型：0是他人创建，1是自己创建",
            "parentId": 10542
        },
        {
            "id": 10761,
            "name": "projects",
            "type": 10543,
            "isArray": 1,
            "description": "项目组中的项目列表",
            "parentId": 10542
        },
        {
            "id": 10780,
            "name": "pid",
            "type": 10001,
            "isArray": 0,
            "description": "项目id",
            "parentId": 10547
        },
        {
            "id": 10781,
            "name": "offset",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10782,
            "name": "limit",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10783,
            "name": "key",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10784,
            "name": "type",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10785,
            "name": "table",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10786,
            "name": "isExact",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10547
        },
        {
            "id": 10768,
            "name": "createTime",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10769,
            "name": "createUserID",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10770,
            "name": "description",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10771,
            "name": "uGroupName",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10772,
            "name": "updateTime",
            "type": 10001,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10773,
            "name": "usrGroupId",
            "type": 10002,
            "isArray": 0,
            "description": "",
            "parentId": 10544
        },
        {
            "id": 10774,
            "name": "members",
            "type": 10545,
            "isArray": 1,
            "description": "",
            "parentId": 10544
        }
    ]
}

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

let getInputValue = (input, data) => {
    let result = {}
    if (input.isSysType) {
        if (input.isArray) {
            if (isAllValueValidType(data[input.name], input.type)) {
                result = data[input.name]
            } else {
                result = []
            }
        } else {
            if (checkValueIsType(data[input.name], input.type)) {
                result = data[input.name]
            } else {
                result = getPrimiteValue(input.type, '')
            }
        }
    } else {
        let attributes = []
        dataSource.attributes.forEach((ds) => {
            if (ds.parentId === input.type) {
                attributes.push(ds)
            }
        })
        attributes.forEach((attr) => {
            attr.isSysType = isSysType(attr.type)
            result[attr.name] = getInputValue(attr, data[input.name] || {})
        })
    }
    return result
}

let getTestData = (inputs, savedData) => {
    inputs.forEach((input) => {
        if (input.isPrimite) {
            result = getPrimiteValue(input.type, savedData || '')
        } else {
            result[input.name] = getInputValue(input, savedData || {})
        }
    })
}

// primite data test
let inputs = [
    {
        "id": 13315,
        "name": "complex",
        "type": 10543,
        "isPrimite": 0,
        "typeName": "Project",
        "isSysType": 0,
        "isArray": 0,
        "description": "",
        "updateTime": 1447153055000
    },
    {
        "id": 10780,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "pid",
        "originalType": 10001,
        "type": 10001,
        "typeName": "String",
        "isSysType": 1,
        "isArray": 0,
        "description": "项目id",
        "updateTime": 1446793783000
    },
    {
        "id": 10781,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "offset",
        "originalType": 10002,
        "type": 10002,
        "typeName": "Number",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    },
    {
        "id": 10782,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "limit",
        "originalType": 10002,
        "type": 10002,
        "typeName": "Number",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    },
    {
        "id": 10783,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "key",
        "originalType": 10001,
        "type": 10001,
        "typeName": "String",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    },
    {
        "id": 10784,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "type",
        "originalType": 10001,
        "type": 10001,
        "typeName": "String",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    },
    {
        "id": 10785,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "table",
        "originalType": 10001,
        "type": 10001,
        "typeName": "String",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    },
    {
        "id": 10786,
        "datatypeId": 10547,
        "datatypeName": "SearchParam",
        "projectId": 10597,
        "name": "isExact",
        "originalType": 10002,
        "type": 10002,
        "typeName": "Number",
        "isSysType": 1,
        "isArray": 0,
        "description": "",
        "updateTime": 1446793783000
    }
]
let saveData = {
    //"complex": {
    //    "creatorId": 10086,
    //    "creatorName": "HuntBao",
    //    "id": 10011,
    //    "name": "bao",
    //    "qbsId": 10,
    //    "type": 9
    //},
    //"pid": "999",
    //"offset": 111,
    //"limit": 22,
    //"key": "22",
    //"type": "2",
    //"table": "222",
    //"isExact": 333
}
getTestData(inputs, saveData)
console.log(JSON.stringify(result))