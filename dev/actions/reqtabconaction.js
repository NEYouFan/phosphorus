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

    toggleMethodsDropDown() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_TOGGLE_METHODS_DD
        })
    },

    toggleKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_TOGGLE_KV
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
    },

    fillParams(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_FILL_PARAMS,
            tabIndex: tabIndex
        })
    },

    changeKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_CHANGE_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_CHANGE_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqTabConAction
