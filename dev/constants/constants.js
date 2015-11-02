//author @huntbao
'use strict'

import keyMirror from 'keymirror'

let AppConstants = keyMirror({
    // side tab action
    SIDE_TAB_CHANGE_ACTIVE_INDEX: null,
    // req tab action
    REQ_TAB_ADD: null,
    REQ_TAB_REMOVE: null,
    REQ_TAB_CHANGE: null,
    REQ_TAB_CHANGE_ACTIVE_INDEX: null,
    // req content action
    REQ_CONTENT_CHANGE_ACTIVE_INDEX: null,
    REQ_CONTENT_CHANGE_METHOD: null,
    REQ_CONTENT_FILL_URL_PARAMS: null,
    REQ_CONTENT_ADD: null,
    REQ_CONTENT_REMOVE: null,
    REQ_CONTENT_TOGGLE_METHODS_LIST: null,
    REQ_CONTENT_UPDATE_ACE_EDITOR: null,
    REQ_CONTENT_SEND: null,
    // url params kv action
    REQ_URL_PARAMS_ADD_KV: null,
    REQ_URL_PARAMS_REMOVE_KV: null,
    REQ_URL_PARAMS_TOGGLE_KV: null,
    REQ_URL_PARAMS_CHANGE_KV_KEY: null,
    REQ_URL_PARAMS_CHANGE_KV_VALUE: null,
    // builder
    REQ_BUILDER_SWITCH_TAB: null,
    REQ_BODY_CHANGE_RAW_DATA: null,
    // header kv action
    REQ_HEADER_TOGGLE_KV: null,
    REQ_HEADER_ADD_KV: null,
    REQ_HEADER_REMOVE_KV: null,
    REQ_HEADER_CHANGE_KV_KEY: null,
    REQ_HEADER_CHANGE_KV_VALUE: null,
    // body action
    REQ_BODY_CHANGE_TYPE: null,
    REQ_BODY_CHANGE_TYPE_VALUE: null,
    REQ_BODY_TOGGLE_TYPE_LIST: null,
    // body form data kv action
    REQ_BODY_FORMDATA_TOGGLE_KV: null,
    REQ_BODY_FORMDATA_ADD_KV: null,
    REQ_BODY_FORMDATA_REMOVE_KV: null,
    REQ_BODY_FORMDATA_CHANGE_KV_KEY: null,
    REQ_BODY_FORMDATA_CHANGE_KV_VALUE: null,
    REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE: null,
    // body x form kv action
    REQ_BODY_XFORM_TOGGLE_KV: null,
    REQ_BODY_XFORM_ADD_KV: null,
    REQ_BODY_XFORM_REMOVE_KV: null,
    REQ_BODY_XFORM_CHANGE_KV_KEY: null,
    REQ_BODY_XFORM_CHANGE_KV_VALUE: null,
    REQ_BODY_XFORM_CHANGE_KV_VALUE_TYPE: null,
    // response actions
    RES_TOGGLE_PRETTY_TYPE_LIST: null,
    RES_CHANGE_PRETTY_TYPE_VALUE: null,
})

export default AppConstants
