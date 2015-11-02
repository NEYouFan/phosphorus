//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ResAction  {

    static toggleResPrettyTypeList () {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_TOGGLE_PRETTY_TYPE_LIST
        })
    }

    static changeResPrettyValue (prettyType) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHANGE_PRETTY_TYPE_VALUE,
            prettyType: prettyType
        })
    }

    static changeResShowType (showType) {
        AppDispatcher.dispatch({
            actionType: AppConstants.RES_CHANGE_SHOW_TYPE,
            showType: showType
        })
    }

}

export default ResAction
