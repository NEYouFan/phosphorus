//author @huntbao
'use strict'

import AppConstants from '../constants/constants'
import AppDispatcher from '../dispatcher/dispatcher'
import Events from 'events'

const CHANGE_EVENT = 'change'

let panelState = {
    history: true
}

function switchPanel(historyState) {
    panelState.history = historyState
}

let PanelStore = Object.assign({}, Events.EventEmitter.prototype, {

    getState() {
        return {
            panel: panelState
        }
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

AppDispatcher.register(function (action) {

    switch (action.actionType) {

        case AppConstants.SWITCH_PANEL:
            switchPanel(action.historyState)
            PanelStore.emitChange()
            break

        default:
            break
    }

})

export default PanelStore
