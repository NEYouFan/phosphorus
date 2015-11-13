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

    static fetchCollections() {
        // fetch collections from nei
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_TAB_FETCH_COLLECTIONS
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

    static editCollection(options) {
        AppDispatcher.dispatch({
            actionType: AppConstants.SIDE_EDIT_COLLECTION,
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

}

export default SideTabAction
