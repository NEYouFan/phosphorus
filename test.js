'use strict'

let result = {}

let dataSource = {
    attributes: [
        {
            "name": "id",
            "type": 10002,
            "isArray": 0,
            "parentId": 10099
        },
        {
            "name": "name",
            "type": 10001,
            "isArray": 0,
            "parentId": 10099
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
        result[input.name] = {}
        let attributes = []
        dataSource.attributes.forEach((ds) => {
            if (ds.parentId === input.type) {
                attributes.push(ds)
            }
        })
        attributes.forEach((attr) => {
            //result[input.name][attr.name] = getInputValue(attr, data[input.name])
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
        "name": "aa",
        "isPrimite": 0,
        "type": 10099,
        "isSysType": 0,
        "isArray": 0
    }
]
let saveData = {
    aa: '12212121'
}
getTestData(inputs, saveData)
console.log(result)