//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import Util from '../libs/util'
import SideTabStore from './sidetabstore'

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

    openModal(type) {
        switch (type) {
            case AppConstants.MODAL_COLLECTION_ALREADY_BEEN_IMPORTED_TIP:
                actions.openModal({
                    type: AppConstants.MODAL_COLLECTION_ALREADY_BEEN_IMPORTED_TIP,
                    title: 'Tips',
                    data: {
                        tip: 'Collection has already been imported. If you want to update this collection, you can click the setting button and choose "synchronize" function.'
                    }
                })
                break

            default:
                break
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
                okText: 'Save',
                cancelText: 'Cancel',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_FOLDER_HOST:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_FOLDER_HOST,
                title: 'Edit host',
                okText: 'Save',
                cancelText: 'Cancel',
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

        case AppConstants.MODAL_SAVE_NEW_REQUEST:
            actions.openModal({
                type: AppConstants.MODAL_SAVE_NEW_REQUEST,
                title: 'Add request to a collection',
                okText: 'Add to collection',
                cancelText: 'Cancel',
                data: {
                    collections: SideTabStore.getCollections(),
                    tab: action.tab
                }
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_LEAVING_DIRTY_TAB:
            actions.openModal({
                type: AppConstants.MODAL_LEAVING_DIRTY_TAB,
                title: 'Are you sure?',
                okText: 'Leave',
                data: action.data
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_CLOSING_DIRTY_TAB:
            actions.openModal({
                type: AppConstants.MODAL_CLOSING_DIRTY_TAB,
                title: 'Are you sure?',
                okText: 'Close',
                data: action.data
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_CREATE_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_CREATE_COLLECTION,
                title: 'Create a new collection',
                okText: 'Create',
                cancelText: 'Cancel',
                data: {}
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_IMPORT_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_IMPORT_COLLECTION,
                title: 'Import collection from NEI',
                okText: 'Import',
                cancelText: 'Cancel',
                data: {}
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_CLEAR_LOCAL_STORAGE:
            actions.openModal({
                type: AppConstants.MODAL_CLEAR_LOCAL_STORAGE,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: {}
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_COLLECTION,
                title: 'Edit collection',
                okText: 'Save',
                cancelText: 'Cancel',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_SYNC_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_SYNC_COLLECTION,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_RUN_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_RUN_COLLECTION,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_DELETE_COLLECTION:
            actions.openModal({
                type: AppConstants.MODAL_DELETE_COLLECTION,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_CREATE_FOLDER:
            actions.openModal({
                type: AppConstants.MODAL_CREATE_FOLDER,
                title: `Add folder inside ${action.collection.name}`,
                okText: 'Create',
                cancelText: 'Cancel',
                data: action.collection
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_FOLDER:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_FOLDER,
                title: `Edit folder`,
                okText: 'Save',
                cancelText: 'Cancel',
                data: action.folder
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_DELETE_FOLDER:
            actions.openModal({
                type: AppConstants.MODAL_DELETE_FOLDER,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: action.folder
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_EDIT_REQUEST:
            actions.openModal({
                type: AppConstants.MODAL_EDIT_REQUEST,
                title: 'Edit request',
                okText: 'Save',
                cancelText: 'Cancel',
                data: action.req
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_MOVE_REQUEST:
            actions.openModal({
                type: AppConstants.MODAL_MOVE_REQUEST,
                title: 'Move request',
                data: {
                    req: action.req,
                    collections: SideTabStore.getCollections(),
                    tab: action.tab
                }
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_DELETE_REQUEST:
            actions.openModal({
                type: AppConstants.MODAL_DELETE_REQUEST,
                title: 'Are you sure?',
                okText: 'Yes',
                cancelText: 'No',
                data: action.req
            })
            ModalStore.emitChange()
            break

        case AppConstants.MODAL_RUN_COLLECTION_REPORT:
            actions.openModal({
                type: AppConstants.MODAL_RUN_COLLECTION_REPORT,
                title: 'Collection running result',
                data: action.data
            })
            ModalStore.emitChange()
            break

        default:
            break
    }

})

export default ModalStore
