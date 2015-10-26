//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'

const CHANGE_EVENT = 'change'
const NEW_TAB = 'New tab'
const DEFAULT_ACTIVE_INDEX = 0

let tabs = {
    items: [
        {
            name: NEW_TAB
        }
    ],
    activeIndex: DEFAULT_ACTIVE_INDEX
}

let actions = {
    changeIndex(activeIndex) {
        tabs.activeIndex = activeIndex
    },

    addTab() {
        tabs.items.push({
            name: NEW_TAB
        })
    },

    removeTab(tabIndex) {
        tabs.items.splice(tabIndex, 1)
    }
}


let ReqTabStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            reqTabs: tabs.items
        }
    },

    getActiveTabIndex() {
        return tabs.activeIndex
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
        case AppConstants.REQ_TAB_CHANGE_ACTIVE_INDEX:
            actions.changeIndex(action.activeIndex)
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_ADD:
            actions.addTab()
            ReqTabStore.emitChange()
            break

        case AppConstants.REQ_TAB_REMOVE:
            actions.removeTab(action.tabIndex)
            ReqTabStore.emitChange()
            break

        default:
            break
    }

})

export default ReqTabStore
