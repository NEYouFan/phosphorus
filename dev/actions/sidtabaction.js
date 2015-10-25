//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let SideTabAction = {

    switchTab(activeIndex) {
        AppDispatcher.dispatch({
            actionType: AppConstants.CHANGE_SIDE_TAB_ACTIVE_INDEX,
            activeIndex: activeIndex
        })
    }

}

export default SideTabAction
