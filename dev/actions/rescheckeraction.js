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

    static addResCheckerKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_ADD_KV
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

    static changeResCheckerKVValue(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHECKER_CHANGE_KV_VALUE,
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

}

export default ReqResCheckerAction