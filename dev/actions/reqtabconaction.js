//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let ReqTabConAction = {

    switchTab(activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CHANGE_REQ_TAB_CONTENT_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
    }

}

export default ReqTabConAction
