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

}

export default ReqBodyAction
