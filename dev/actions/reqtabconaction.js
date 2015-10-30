//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqTabConAction  {

    static addCon() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_ADD
        })
    }

    static removeCon(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_REMOVE,
            tabIndex: tabIndex
        })
    }

    static toggleMethodList(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_METHODS_LIST,
            tabIndex: tabIndex
        })
    }

    static changeMethod(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_CHANGE_METHOD,
            tabIndex: tabIndex
        })
    }

    static fillURLParams(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_FILL_URL_PARAMS,
            tabIndex: tabIndex
        })
    }

    static toggleURLParamsKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static addURLParamsKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_ADD_KV,
            tabIndex: tabIndex
        })
    }

    static removeURLParamsKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static editURLParamsKV(tabIndex) {
        //todo, bulk edit
    }

    static changeURLParamsKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeURLParamsKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static switchBuilderTab(tabIndex, activeTabName) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BUILDER_SWITCH_TAB,
            tabIndex: tabIndex,
            activeTabName: activeTabName
        })
    }

}

export default ReqTabConAction
