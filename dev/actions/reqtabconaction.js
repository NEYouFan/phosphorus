//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabConAction = {

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

    changeTabName(tabName, tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CHANGE_NAME,
            tabName: tabName,
            tabIndex: tabIndex
        })
    },

    addParamsKVRow() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_ADD_PARAMS_KV_ROW
        })
    },

    removeParamsKVRow(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_REMOVE_PARAMS_KV_ROW,
            rowIndex: rowIndex
        })
    },

    fillParams(tabUrl, tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_FILL_PARAMS,
            tabUrl: tabUrl,
            tabIndex: tabIndex
        })
    }

}

export default ReqTabConAction
