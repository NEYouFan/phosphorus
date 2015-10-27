//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabAction = {

    switchTab(activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CHANGE_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CONTENT_CHANGE_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
    },

    changeTab(tab, tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CHANGE,
            tab: tab,
            tabIndex: tabIndex
        })
    },

    addTab() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_ADD
        })
    },

    removeTab(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_REMOVE,
            tabIndex: tabIndex
        })
    }

}

export default ReqTabAction
