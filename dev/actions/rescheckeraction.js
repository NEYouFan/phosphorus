//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqResCheckerAction {

    static toggleResCheckerKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addResCheckerKV(rowIndex, kv) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_ADD_KV,
            rowIndex: rowIndex,
            kv: kv
        })
    }

    static removeResCheckerKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_REMOVE_KV,
            rowIndex: rowIndex
        })
    }

    static changeResCheckerKVKey(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_CHANGE_KV_KEY,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeResCheckerKVValueType(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_CHANGE_KV_VALUE_TYPE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeResCheckerKVChildValueType(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_CHANGE_KV_CHILD_VALUE_TYPE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static toggleJSONTypeList() {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_TOGGLE_JSON_TYPE_LIST
        })
    }

    static changeJSONTypeValue(jsonType) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_CHANGE_JSON_TYPE,
            jsonType: jsonType
        })
    }

}

export default ReqResCheckerAction
