//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqBodyAction = {

    changeBodyType(tabIndex, type) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE,
            tabIndex: tabIndex,
            bodyType: type
        })
    },

    changeBodyTypeValue(tabIndex, bodyTypeValue) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE_VALUE,
            tabIndex: tabIndex,
            bodyTypeValue: bodyTypeValue
        })
    },

    toggleRawTypeList(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_TOGGLE_TYPE_LIST,
            tabIndex: tabIndex
        })
    },

    toggleBodyFormDataKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addBodyFormDataKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_ADD_KV,
            tabIndex: tabIndex
        })
    },

    removeBodyFormDataKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editBodyFormDataKV(tabIndex) {
        //todo, bulk edit
    },

    changeBodyFormDataKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeBodyFormDataKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeBodyFormDataKVValueType(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    toggleBodyXFormKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    addBodyXFormKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_ADD_KV,
            tabIndex: tabIndex
        })
    },

    removeBodyXFormKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    },

    editBodyXFormKV(tabIndex) {
        //todo, bulk edit
    },

    changeBodyXFormKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    },

    changeBodyXFormKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

}

export default ReqBodyAction
