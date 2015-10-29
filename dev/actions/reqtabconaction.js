//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabConAction = {

    addCon() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_ADD
        })
    },

    removeCon(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_REMOVE,
            tabIndex: tabIndex
        })
    },

    toggleMethodList(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_METHODS_LIST,
            tabIndex: tabIndex
        })
    },

    toggleParams(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_PARAMS,
            tabIndex: tabIndex
        })
    },

    changeMethod(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_CHANGE_METHOD,
            tabIndex: tabIndex
        })
    },

    fillParams(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_FILL_PARAMS,
            tabIndex: tabIndex
        })
    },

    toggleParamKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addParamKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_ADD_KV,
            tabIndex: tabIndex
        })
    },

    removeParamKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editParamKV(tabIndex) {
        //todo, bulk edit
    },

    changeParamKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeParamKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    switchBuilderTab(tabIndex, activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BUILDER_SWITCH_TAB,
            tabIndex: tabIndex,
            activeIndex: activeIndex
        })
    }

}

export default ReqTabConAction
