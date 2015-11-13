//author @huntbao
'use strict'

const REQUEST_DATA_MAP = {
    id: 'id',
    isNEI: 'is_nei',
    name: 'name',
    url: 'url',
    paramKVs: {
        saveKey: 'url_params',
        requiredField: 'key',
        fields: {
            checked: 'checked',
            isPV: 'is_pv',
            key: 'key',
            readonly: 'readonly',
            value: 'value'
        }
    },
    headerKVs: {
        saveKey: 'headers',
        requiredField: 'key',
        fields: {
            checked: 'checked',
            key: 'key',
            value: 'value'
        }
    },
    bodyType: {
        saveKey: 'body_type',
        requiredField: 'name',
        fields: {
            name: 'name',
            type: 'type'
        }
    },
    bodyFormDataKVs: {
        saveKey: 'body_form_data',
        requiredField: 'key',
        fields: {
            checked: 'checked',
            key: 'key',
            value: 'value',
            valueType: 'value_type'
        }
    },
    bodyXFormKVs: {
        saveKey: 'body_x_form_data',
        requiredField: 'key',
        fields: {
            checked: 'checked',
            key: 'key',
            value: 'value'
        }
    },
    bodyRawData: 'body_raw_data',
    resCheckerKVs: {
        saveKey: 'res_checker_data',
        requiredField: 'key',
        fields: {
            checked: 'checked',
            key: 'key',
            value: 'value',
            valueType: 'value_type'
        }
    }
}

export default REQUEST_DATA_MAP
