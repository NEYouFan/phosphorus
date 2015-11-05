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
    type: '' // kind of modal
}

let actions = {

    openModal(type, title) {
        modal.open = true
        modal.type = type
        modal.title = title
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

        case AppConstants.MODAL_OPEN_EDIT_COLL_SERVER_URL:
            actions.openModal(AppConstants.MODAL_OPEN_EDIT_COLL_SERVER_URL, 'Edit server url')
            ModalStore.emitChange()
            break

        default:
            break
    }

})

export default ModalStore
