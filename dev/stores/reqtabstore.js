//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'

const ADD_EVENT = 'add'
const REMOVE_EVENT = 'remove'

let tabs = {
    items: [
        {
            name: 'tab1'
        }
    ]
}

let ReqTabStore = Object.assign({}, Events.EventEmitter.prototype, {

    getState() {
        return {
            tabs: tabs
        }
    },

    emitAdd() {
        this.emit(ADD_EVENT)
    },

    addAddListener(callback) {
        this.on(ADD_EVENT, callback);
    },

    removeAddListener(callback) {
        this.removeListener(ADD_EVENT, callback);
    }
})

AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case AppConstants.ADD_REQ_TAB:
            switchPanel(action.historyState)
            PanelStore.emitChange()
            break

        default:
            break
    }

})

export default PanelStore
