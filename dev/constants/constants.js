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
    REQ_TAB_CHANGE: null,
    // req content action
    REQ_CONTENT_CHANGE_ACTIVE_INDEX: null,
    REQ_CONTENT_CHANGE_METHOD: null,
    REQ_CONTENT_FILL_PARAMS: null,
    REQ_CONTENT_ADD: null,
    REQ_CONTENT_REMOVE: null,
    REQ_CONTENT_TOGGLE_PARAMS: null,
    REQ_CONTENT_TOGGLE_METHODS_DD: null,
    // params kv action
    REQ_PARAM_ADD_ROW: null,
    REQ_PARAM_REMOVE_ROW: null,
    REQ_PARAM_TOGGLE_CHECK: null,
    REQ_PARAM_CHANGE_KEY: null,
    REQ_PARAM_CHANGE_VALUE: null,
    // builder
    REQ_BUILDER_SWITCH_TAB: null,
    // header kv action
    REQ_HEADER_TOGGLE_CHECK: null,
    REQ_HEADER_ADD_ROW: null,
    REQ_HEADER_REMOVE_ROW: null,
    REQ_HEADER_CHANGE_KEY: null,
    REQ_HEADER_CHANGE_VALUE: null,
})

export default AppConstants
