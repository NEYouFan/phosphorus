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

console.log(checkResponseResult())
