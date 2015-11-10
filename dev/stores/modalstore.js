//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import Util from '../libs/util'

const CHANGE_EVENT = 'change'

let modal = {
    open: false,
    title: 'Title',
    okText: 'OK',
    cancelText: 'Cancel',
    type: '', // kind of modal
    data: {} // additional data
}

let actions = {

    openModal(options) {
        modal.open = true
        Object.assign(modal, options)
    },

    closeModal() {
        modal.open = false
    }

}

let ModalStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            modal: modal
        }
    },

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }
})

AppDispatcher.register((action) => {

    switch (action.actionType) {

        case AppConstants.MODAL_CLOSE:
            actions.closeModal()
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_OPEN:
            actions.openModal()
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_COLL_HOST:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_COLL_HOST,
                title: 'Edit host',
                okText: 'Apply',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_FOLDER_HOST:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_FOLDER_HOST,
                title: 'Edit host',
                okText: 'Apply',
                data: action.folder
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_SAVE_BLANK_URL_TIP:
            actions.openModal({
                type: AppConstants.MODAL_SAVE_BLANK_URL_TIP,
                title: 'Tips',
                data: {
                    tip: 'Please input your request url if you want to save this request.'
                }
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_LEAVING_DIRTY_TAB:
            actions.openModal({
                type: AppConstants.MODAL_LEAVING_DIRTY_TAB,
                title: 'Please confirm',
                okText: 'Leave anyway!',
                data: action.data
            })
            ModalStore.emitChange()
            break

        default:
            break
    }

})

export default ModalStore
