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
    }

}

export default ReqTabConAction
