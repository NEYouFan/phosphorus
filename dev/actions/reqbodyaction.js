//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqBodyAction  {

    static changeBodyType(tabIndex, type) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE,
            tabIndex: tabIndex,
            bodyType: type
        })
        // update ace editor's value and mode
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_UPDATE_ACE_EDITOR
        })
    }

    static changeBodyTypeValue(tabIndex, bodyTypeValue, bodyTypeName) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_TYPE_VALUE,
            tabIndex: tabIndex,
            bodyTypeValue: bodyTypeValue,
            bodyTypeName: bodyTypeName
        })
    }

    static toggleRawTypeList(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_TOGGLE_TYPE_LIST,
            tabIndex: tabIndex
        })
    }

    static toggleBodyFormDataKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static addBodyFormDataKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_ADD_KV,
            tabIndex: tabIndex
        })
    }

    static removeBodyFormDataKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static editBodyFormDataKV(tabIndex) {
        //todo, bulk edit
    }

    static changeBodyFormDataKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyFormDataKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyFormDataKVValueType(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static toggleBodyXFormKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_TOGGLE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static addBodyXFormKV(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_ADD_KV,
            tabIndex: tabIndex
        })
    }

    static removeBodyXFormKV(tabIndex, rowIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_REMOVE_KV,
            tabIndex: tabIndex,
            rowIndex: rowIndex
        })
    }

    static editBodyXFormKV(tabIndex) {
        //todo, bulk edit
    }

    static changeBodyXFormKVKey(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_KEY,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyXFormKVValue(tabIndex, rowIndex, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_XFORM_CHANGE_KV_VALUE,
            tabIndex: tabIndex,
            rowIndex: rowIndex,
            value: value
        })
    }

    static changeBodyRawData(tabIndex, text) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_BODY_CHANGE_RAW_DATA,
            tabIndex: tabIndex,
            text: text
        })
    }

}

export default ReqBodyAction
