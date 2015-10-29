//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqHeaderAction = {

    toggleHeaderKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addHeaderKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_ADD_KV,
            tabIndex: tabIndex
        })
    },

    removeHeaderKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editHeaderKV(tabIndex) {
        //todo, bulk edit
    },

    changeHeaderKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeHeaderKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqHeaderAction
