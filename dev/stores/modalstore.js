//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'
import Util from '../libs/util'

const CHANGE_EVENT = 'change'

let tabs = {
    activeTabName: 'Collections'
}

let actions = {


}

let ModalStore = Object.assign({}, Events.EventEmitter.prototype, {

    getAll() {
        return {
            sideTab: {

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

        case AppConstants.SIDE_TAB_CHANGE_ACTIVE_NAME:
            actions.changeIndex(action.activeTabName)
            SideTabStore.emitChange()
            break

        default:
            break
    }

})

export default ModalStore
