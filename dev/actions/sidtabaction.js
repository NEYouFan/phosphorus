//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'

class SideTabAction  {

    static switchTab(activeTabName) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_TAB_CHANGE_ACTIVE_NAME,
            activeTabName: activeTabName
        })
    }

    static getCollections() {
        // get collections from local storage
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_TAB_GET_COLLECTIONS
        })
    }

    static changeCollHost(collection, host) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CHANGE_COLL_HOST,
            collection: collection,
            host: host
        })
    }

    static changeFolderHost(folder, host) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CHANGE_FOLDER_HOST,
            folder: folder,
            host: host
        })
    }

    static changeActiveReqId(reqId) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CHANGE_ACTIVE_REQ_ID,
            reqId: reqId
        })
    }

    static createCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CREATE_COLLECTION,
            options: options
        })
    }

    static importCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_IMPORT_COLLECTION,
            options: options
        })
    }

    static clearLocalStorage() {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CLEAR_LOCAL_STORAGE
        })
    }

    static editCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_EDIT_COLLECTION,
            options: options
        })
    }

    static syncCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_SYNC_COLLECTION,
            options: options
        })
    }

    static runCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_RUN_COLLECTION,
            options: options
        })
    }

    static createFolder(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_CREATE_FOLDER,
            options: options
        })
    }

    static deleteCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_DELETE_COLLECTION,
            options: options
        })
    }

    static deleteFolder(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_DELETE_FOLDER,
            options: options
        })
    }

    static editFolder(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_EDIT_FOLDER,
            options: options
        })
    }

    static saveRequest(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_SAVE_NEW_REQUEST,
            options: options
        })
    }

    static deleteRequest(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_DELETE_REQUEST,
            options: options
        })
    }

    static editRequest(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_EDIT_REQUEST,
            options: options
        })
    }

    static moveRequest(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_MOVE_REQUEST,
            options: options
        })
    }

    static setLoadingTip(data) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_SET_LOADING_TIP,
            data: data
        })
    }

}

export default SideTabAction
