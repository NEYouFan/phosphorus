//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

let AppActions = {

    switchPanel(historyState) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SWITCH_PANEL,
            historyState: historyState
        })
    }

}

export default AppActions
