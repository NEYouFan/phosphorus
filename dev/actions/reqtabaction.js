//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ReqTabAction {

    static switchTab(activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CHANGE_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
        // update ace editor's value and mode
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_CONTENT_UPDATE_ACE_EDITOR
        })
    }

    static changeTab(tab) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_CHANGE,
            tab: tab
        })
    }

    static addTab() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_ADD
        })
    }

    static removeTab(tabIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_REMOVE,
            tabIndex: tabIndex
        })
    }

    static setDirtyTab(isDirty) {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_SET_DIRTY,
            isDirty: isDirty
        })
    }

    static saveTab() {
        AppDispatcher.dispatch({
            actionType: AppConstants.REQ_TAB_SAVE
        })
    }

}

export default ReqTabAction
