'use strict'

let resChecker = [
    {
        key: 'id',
        checked: true,
        valueType: 'number',
        values: []
    },
    {
        key: 'family',
        checked: true,
        valueType: 'object',
        values: [
            {
                key: 'name',
                valueType: 'string',
                checked: true
            },
            {
                key: 'tools',
                valueType: 'array',
                checked: true,
                values:[
                    {
                        key: 'id',
                        valueType: 'number',
                        checked: true
                    },
                    {
                        key: 'sex',
                        valueType: 'string',
                        checked: true
                    },
                    {
                        key: 'tests',
                        valueType: 'object',
                        checked: true,
                        values: [
                            {
                                key: 'id',
                                valueType: 'number',
                                checked: true
                            }
                        ]
                    }
                ]
            },
            {
                key: 'fromChina',
                valueType: 'boolean',
                checked: true
            }
        ]
    }
]

let resData = {
    id: 111,
    family: {
        name: 'hi',
        tools: [
            {
                name: 111,
                id: 333,
                sex: 'female',
                tests: {
                    id: 111
                }
            },
            {
                name: 111,
                id: 333,
                sex: 'female',
                tests: {
                    id: 111
                }
            }
        ],
        fromChina: 111
    }
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
                        keyPaths.push(key)
                        for (let j = 0, m = data[key].length; j < m; j++) {
                            let tempResult = checkData(rc.values, data[key][j])
                            if (tempResult) {
                                return tempResult
                            }
                        }
                        keyPaths.pop()
                    } else if (resultKeyType === 'object') {
                        keyPaths.push(key)
                        let tempResult = checkData(rc.values, data[key])
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

console.log(checkResponseResult())
