//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqURLParamsAction = {

    toggleURLParamsKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addURLParamsKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_ADD_KV,
            tabIndex: tabIndex
        })
    },

    removeURLParamsKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editURLParamsKV(tabIndex) {
        //todo, bulk edit
    },

    changeURLParamsKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeURLParamsKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqURLParamsAction
