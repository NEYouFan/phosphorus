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
    activeIndex: DEFAULT_ACTIVE_INDEX
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
    }
}


let ReqTabConStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabCons: tabCons.items
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
        case AppConstants.CHANGE_REQ_TAB_CONTENT_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabConStore.emitChange()
            break

        case AppConstants.ADD_REQ_TAB_CONTENT:
            actions.addTabCon()
            ReqTabConStore.emitChange()
            break

        case AppConstants.REMOVE_REQ_TAB_CONTENT:
            actions.removeTabCon(action.tabIndex)
            ReqTabConStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabConStore
