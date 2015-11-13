'use strict'

let d = [{
    "checked": true,
    "key": "ssss",
    "value": [{"keyPlaceholder": "Key", "valuePlaceholder": "Value", "checked": true, "key": "d", "value": [], "keyDataList": "", "valueDataList": "", "valueType": "string", "typeChangeable": true, "index": "0.0", "keyError": false}, {"keyPlaceholder": "Key", "valuePlaceholder": "Value", "checked": true, "key": "dddd", "value": [], "keyDataList": "", "valueDataList": "", "valueType": "string", "typeChangeable": true, "index": "0.1", "keyError": false}, {
        "keyPlaceholder": "Key",
        "valuePlaceholder": "Value",
        "checked": true,
        "key": "",
        "value": [],
        "keyDataList": "",
        "valueDataList": "",
        "valueType": "string",
        "typeChangeable": true,
        "index": "0.2"
    }],
    "value_type": "object"
}, {"checked": true, "key": "dddd", "value": [], "value_type": "string"}]

let refineData = (data) => {
    let result = data.value.map((item) => {
        if (item.key) {
            return {
                key: item.key,
                checked: item.checked,
                value: refineData(item),
                'value_type': item.valueType
            }
        }
    })
    // remove null elements
    result = result.filter((item) => {
        return item
    })
    return result
}
d.forEach((item) => {
    item.value = refineData(item)
})
console.log(JSON.stringify(d))
