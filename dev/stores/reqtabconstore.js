//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'

const CHANGE_EVENT = 'change'
const NEW_TAB_CONTENT = 'New Content'
const DEFAULT_ACTIVE_INDEX = 0

let tabCons = {
    items: [
        {
            name: NEW_TAB_CONTENT
        }
    ],
    activeIndex: DEFAULT_ACTIVE_INDEX,
    reqMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
    showReqMethodsDropdown: false
}

let actions = {
    changeIndex(activeIndex) {
        tabCons.activeIndex = activeIndex
    },

    addTabCon() {
        tabCons.items.push({
            name: NEW_TAB_CONTENT
        })
    },

    removeTabCon(tabIndex) {
        tabCons.items.splice(tabIndex, 1)
    },

    hideReqMethodsDD() {
        tabCons.showReqMethodsDropdown = false
    },

    showReqMethodsDD() {
        tabCons.showReqMethodsDropdown = true
    }
}


let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCons: {
                reqCons: tabCons.items,
                reqMethods: tabCons.reqMethods,
                showReqMethodsDropdown: tabCons.showReqMethodsDropdown
            }
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
        case AppConstants.REQ_TAB_CONTENT_CHANGE_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_ADD:
            actions.addTabCon()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_REMOVE:
            actions.removeTabCon(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_SHOW_METHODS_DD:
            actions.showReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REQ_TAB_CONTENT_HIDE_METHODS_DD:
            actions.hideReqMethodsDD()
            ReqTabConStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabConStore
