//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqHeaderAction {

    static toggleHeaderKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addHeaderKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_ADD_KV
        })
    }

    static removeHeaderKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_REMOVE_KV,
            rowIndex: rowIndex
        })
    }

    static changeHeaderKVKey(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_KEY,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeHeaderKVValue(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_VALUE,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqHeaderAction
