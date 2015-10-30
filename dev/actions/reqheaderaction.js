//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqHeaderAction {

    static toggleHeaderKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static addHeaderKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_ADD_KV,
            tabIndex: tabIndex
        })
    }

    static removeHeaderKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static editHeaderKV(tabIndex) {
        //todo, bulk edit
    }

    static changeHeaderKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeHeaderKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqHeaderAction
