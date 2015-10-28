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

    toggleMethodMenu() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_METHODS_DD
        })
    },

    toggleParamsKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_PARAMS,
            tabIndex: tabIndex
        })
    },

    toggleCheckParam(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_TOGGLE_CHECK,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addParamRow(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_ADD_ROW,
            tabIndex: tabIndex
        })
    },

    removeParamRow(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_REMOVE_ROW,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editParam(tabIndex) {
        //todo, bulk edit
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

    changeParamKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_CHANGE_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeParamValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_PARAM_CHANGE_VALUE,
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
