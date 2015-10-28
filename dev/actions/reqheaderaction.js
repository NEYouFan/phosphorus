//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqHeaderAction = {

    toggleCheckHeader(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_TOGGLE_CHECK,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addHeaderRow(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_ADD_ROW,
            tabIndex: tabIndex
        })
    },

    removeHeaderRow(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_REMOVE_ROW,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editHeader(tabIndex) {
        //todo, bulk edit
    },

    changeHeaderKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeHeaderValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_HEADER_CHANGE_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqHeaderAction
