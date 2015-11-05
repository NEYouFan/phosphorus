//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class ModalAction  {

    static closeModal() {
        AppDispatcher.dispatch({
            actionType: AppConstants.MODAL_CLOSE
        })
    }

    static openModal() {
        AppDispatcher.dispatch({
            actionType: AppConstants.MODAL_OPEN
        })
    }

    static openEditCollServerURLModal() {
        AppDispatcher.dispatch({
            actionType: AppConstants.MODAL_OPEN_EDIT_COLL_SERVER_URL
        })
    }

}

export default ModalAction
