//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqBodyAction  {

    static changeBodyType(type) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE,
            bodyType: type
        })
        // update ace editor's value and mode
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_UPDATE_ACE_EDITOR
        })
    }

    static changeBodyTypeValue(bodyTypeValue, bodyTypeName) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE_VALUE,
            bodyTypeValue: bodyTypeValue,
            bodyTypeName: bodyTypeName
        })
    }

    static toggleRawTypeList() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_TOGGLE_TYPE_LIST
        })
    }

    static toggleBodyFormDataKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addBodyFormDataKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_ADD_KV
        })
    }

    static removeBodyFormDataKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_REMOVE_KV,
            rowIndex: rowIndex
        })
    }

    static editBodyFormDataKV() {
        //todo, bulk edit
    }

    static changeBodyFormDataKVKey(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_KEY,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyFormDataKVValue(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyFormDataKVValueType(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static toggleBodyXFormKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_TOGGLE_KV,
            rowIndex: rowIndex
        })
    }

    static addBodyXFormKV() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_ADD_KV
        })
    }

    static removeBodyXFormKV(rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_REMOVE_KV,
            rowIndex: rowIndex
        })
    }

    static editBodyXFormKV() {
        //todo, bulk edit
    }

    static changeBodyXFormKVKey(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_KEY,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyXFormKVValue(rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_VALUE,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyRawData(text) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_RAW_DATA,
            text: text
        })
    }

}

export default ReqBodyAction
