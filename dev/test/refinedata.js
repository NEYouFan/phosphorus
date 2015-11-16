'use strict'

let d =
    [
        {
            "checked": true,
            "key": "aaa",
            "value": [
                {
                    "keyPlaceholder": "Key",
                    "valuePlaceholder": "Value",
                    "checked": true,
                    "key": "bbbb",
                    "value": [
                        {
                            "keyPlaceholder": "Key",
                            "valuePlaceholder": "Value",
                            "checked": true,
                            "key": "cccc",
                            "value": [
                                {
                                    "keyPlaceholder": "Key",
                                    "valuePlaceholder": "Value",
                                    "checked": true,
                                    "key": "dddd",
                                    "value": [
                                        {
                                            "keyPlaceholder": "Key",
                                            "valuePlaceholder": "Value",
                                            "checked": true,
                                            "key": "eeeee",
                                            "value": [],
                                            "keyDataList": "",
                                            "valueDataList": "",
                                            "valueType": "string",
                                            "typeChangeable": true,
                                            "index": "0.0.0.0.0",
                                            "keyError": false
                                        },
                                        {
                                            "keyPlaceholder": "Key",
                                            "valuePlaceholder": "Value",
                                            "checked": true,
                                            "key": "",
                                            "value": [],
                                            "keyDataList": "",
                                            "valueDataList": "",
                                            "valueType": "string",
                                            "typeChangeable": true,
                                            "index": "0.0.0.0.1"
                                        }
                                    ],
                                    "keyDataList": "",
                                    "valueDataList": "",
                                    "valueType": "object",
                                    "typeChangeable": true,
                                    "index": "0.0.0.0",
                                    "keyError": false
                                },
                                {
                                    "keyPlaceholder": "Key",
                                    "valuePlaceholder": "Value",
                                    "checked": true,
                                    "key": "",
                                    "value": [],
                                    "keyDataList": "",
                                    "valueDataList": "",
                                    "valueType": "string",
                                    "typeChangeable": true,
                                    "index": "0.0.0.1"
                                }
                            ],
                            "keyDataList": "",
                            "valueDataList": "",
                            "valueType": "object",
                            "typeChangeable": true,
                            "index": "0.0.0",
                            "keyError": false
                        },
                        {
                            "keyPlaceholder": "Key",
                            "valuePlaceholder": "Value",
                            "checked": true,
                            "key": "aaa",
                            "value": [],
                            "keyDataList": "",
                            "valueDataList": "",
                            "valueType": "string",
                            "typeChangeable": true,
                            "index": "0.0.1",
                            "keyError": false
                        },
                        {
                            "keyPlaceholder": "Key",
                            "valuePlaceholder": "Value",
                            "checked": true,
                            "key": "dsa",
                            "value": [],
                            "keyDataList": "",
                            "valueDataList": "",
                            "valueType": "string",
                            "typeChangeable": true,
                            "index": "0.0.2",
                            "keyError": false
                        },
                        {
                            "keyPlaceholder": "Key",
                            "valuePlaceholder": "Value",
                            "checked": true,
                            "key": "",
                            "value": [
                                {
                                    "keyPlaceholder": "Key",
                                    "valuePlaceholder": "Value",
                                    "checked": true,
                                    "key": "ads",
                                    "value": [],
                                    "keyDataList": "",
                                    "valueDataList": "",
                                    "valueType": "string",
                                    "typeChangeable": true,
                                    "index": "0.0.3.0",
                                    "keyError": false
                                },
                                {
                                    "keyPlaceholder": "Key",
                                    "valuePlaceholder": "Value",
                                    "checked": true,
                                    "key": "",
                                    "value": [],
                                    "keyDataList": "",
                                    "valueDataList": "",
                                    "valueType": "string",
                                    "typeChangeable": true,
                                    "index": "0.0.3.1"
                                }
                            ],
                            "keyDataList": "",
                            "valueDataList": "",
                            "valueType": "object",
                            "typeChangeable": true,
                            "index": "0.0.3"
                        },
                        {
                            "keyPlaceholder": "Key",
                            "valuePlaceholder": "Value",
                            "checked": true,
                            "key": "",
                            "value": [],
                            "keyDataList": "",
                            "valueDataList": "",
                            "valueType": "string",
                            "typeChangeable": true,
                            "index": "0.0.4"
                        }
                    ],
                    "keyDataList": "",
                    "valueDataList": "",
                    "valueType": "object",
                    "typeChangeable": true,
                    "index": "0.0",
                    "keyError": false
                },
                {
                    "keyPlaceholder": "Key",
                    "valuePlaceholder": "Value",
                    "checked": true,
                    "key": "ddd",
                    "value": [],
                    "keyDataList": "",
                    "valueDataList": "",
                    "valueType": "string",
                    "typeChangeable": true,
                    "index": "0.1",
                    "keyError": false
                },
                {
                    "keyPlaceholder": "Key",
                    "valuePlaceholder": "Value",
                    "checked": true,
                    "key": "ad",
                    "value": [],
                    "keyDataList": "",
                    "valueDataList": "",
                    "valueType": "string",
                    "typeChangeable": true,
                    "index": "0.2",
                    "keyError": false
                },
                {
                    "keyPlaceholder": "Key",
                    "valuePlaceholder": "Value",
                    "checked": true,
                    "key": "999",
                    "value": [],
                    "keyDataList": "",
                    "valueDataList": "",
                    "valueType": "string",
                    "typeChangeable": true,
                    "index": "0.3",
                    "keyError": false
                },
                {
                    "keyPlaceholder": "Key",
                    "valuePlaceholder": "Value",
                    "checked": true,
                    "key": "",
                    "value": [],
                    "keyDataList": "",
                    "valueDataList": "",
                    "valueType": "string",
                    "typeChangeable": true,
                    "index": "0.4"
                }
            ],
            "value_type": "object"
        },
        {
            "checked": true,
            "key": "dddd",
            "value": [],
            "value_type": "string"
        },
        {
            "checked": true,
            "key": "das",
            "value": [],
            "value_type": "string"
        }
    ]

let refineData = (data) => {
    let result = data.value.map((item) => {
        //if (item.key) {
            return {
                key: item.key,
                checked: item.checked,
                value: refineData(item),
                'value_type': item.valueType
            }
        //}
    })
    // remove null elements
    //result = result.filter((item) => {
    //    return item
    //})
    return result
}
d.forEach((item) => {
    item.value = refineData(item)
})
console.log(JSON.stringify(d))

