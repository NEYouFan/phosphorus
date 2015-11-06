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

    static toggleMethodList() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_TOGGLE_METHODS_LIST
        })
    }

    static changeMethod() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_CHANGE_METHOD
        })
    }

    static fillURLParams() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_FILL_URL_PARAMS
        })
    }

    static toggleURLParamsKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addURLParamsKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_ADD_KV
        })
    }

    static removeURLParamsKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_REMOVE_KV,
            rowIndex: rowIndex
        })
    }

    static editURLParamsKV() {
        //todo, bulk edit
    }

    static changeURLParamsKVKey(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_KEY,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeURLParamsKVValue(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_CHANGE_KV_VALUE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static switchBuilderTab(activeTabName) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BUILDER_SWITCH_TAB,
            activeTabName: activeTabName
        })
    }

    static sendReq() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_SEND
        })
    }

    static updateConByRequest(request, dataSource) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_UPDATE_BY_REQUEST,
            request: request,
            dataSource: dataSource
        })
    }

}

export default ReqTabConAction
