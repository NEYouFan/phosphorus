//author @huntbao
'use strict'

import keyMirror from 'keymirror'

let AppConstants = keyMirror({
    // side tab action
    SIDE_TAB_CHANGE_ACTIVE_INDEX: null,
    // req tab action
    REQ_TAB_CHANGE_ACTIVE_INDEX: null,
    REQ_TAB_ADD: null,
    REQ_TAB_REMOVE: null,
    REQ_TAB_CHANGE_NAME: null,
    // req tab content action
    REQ_TAB_CONTENT_CHANGE_ACTIVE_INDEX: null,
    REQ_TAB_CONTENT_SHOW_METHODS_DD: null,
    REQ_TAB_CONTENT_HIDE_METHODS_DD: null,
    REQ_TAB_CONTENT_ADD_PARAMS_KV_ROW: null,
    REQ_TAB_CONTENT_REMOVE_PARAMS_KV_ROW: null,
    REQ_TAB_CONTENT_FILL_PARAMS: null,
})

export default AppConstants
