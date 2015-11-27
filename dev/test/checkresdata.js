'use strict'

let resChecker = [
    {
        key: 'tree',
        checked: true,
        valueType: 'array',
        childValueType: 'object',
        values: [
            {
                key: 'id',
                checked: true,
                valueType: 'object',
                childValueType: ''
            },
            {
                key: 'name',
                checked: true,
                valueType: 'object',
                childValueType: ''
            }
        ]
    }
]

let resData = '121'

let resJSONType = 'boolean'

let checkResponseResult = (resChecker, resJSONType, resData) => {
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
}

console.log(checkResponseResult(resChecker, resJSONType, resData))
