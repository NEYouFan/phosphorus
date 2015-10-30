//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqURLParamsAction  {

    static toggleURLParamsKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_URL_PARAMS_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addURLParamsKV(tabIndex) {
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

    static editURLParamsKV(tabIndex) {
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

}

export default ReqURLParamsAction
