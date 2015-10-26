//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabAction = {

    switchTab(activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CHANGE_REQ_TAB_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
        AppDispatcher.dispatch({
            actionType: AppConstants.CHANGE_REQ_TAB_CONTENT_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
    },

    addTab() {
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_REQ_TAB
        })
        AppDispatcher.dispatch({
            actionType: AppConstants.ADD_REQ_TAB_CONTENT
        })
    },

    removeTab(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_REQ_TAB,
            tabIndex: tabIndex
        })
        AppDispatcher.dispatch({
            actionType: AppConstants.REMOVE_REQ_TAB_CONTENT,
            tabIndex: tabIndex
        })
    }

}

export default ReqTabAction
