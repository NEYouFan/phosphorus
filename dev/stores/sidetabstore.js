//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'

const CHANGE_EVENT = 'change'

let tabs = {
    activeIndex: 0
}

function changeIndex(activeIndex) {
    tabs.activeIndex = activeIndex
}

let SideTabStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            sideTab: tabs
        }
    },

    getActiveTabIndex() {
        return tabs.activeIndex
    },

    emitChange() {
        this.emit(CHANGE_EVENT)
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
})

AppDispatcher.register((action) => {

    switch (action.actionType) {

        case AppConstants.CHANGE_SIDE_TAB_ACTIVE_INDEX:
            changeIndex(action.activeIndex)
            SideTabStore.emitChange()
            break

        default:
            break
    }

})

export default SideTabStore
