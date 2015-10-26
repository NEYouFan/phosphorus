//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabConAction = {

    addCon() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_ADD
        })
    },

    removeCon(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_REMOVE,
            tabIndex: tabIndex
        })
    },

    showMethodsDropDown() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_SHOW_METHODS_DD
        })
    },

    hideMethodsDropDown() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_HIDE_METHODS_DD
        })
    },

    toggleCheckParam(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_TOGGLE_CHECK_PARAM,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addParamsKVRow(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_ADD_PARAMS_KV_ROW,
            tabIndex: tabIndex
        })
    },

    removeParamsKVRow(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_REMOVE_PARAMS_KV_ROW,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editKV() {
        //todo, bulk edit
    }

}

export default ReqTabConAction
