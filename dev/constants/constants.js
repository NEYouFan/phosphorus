//author @huntbao
'use strict'

import keyMirror from 'keymirror'

let AppConstants = keyMirror({
    // side tab action
    SIDE_TAB_CHANGE_ACTIVE_NAME: null,
    SIDE_TAB_GET_COLLECTIONS: null,
    SIDE_CHANGE_COLL_HOST: null,
    SIDE_CHANGE_FOLDER_HOST: null,
    SIDE_CHANGE_ACTIVE_REQ_ID: null,
    SIDE_CREATE_COLLECTION: null,
    SIDE_IMPORT_COLLECTION: null,
    SIDE_CLEAR_LOCAL_STORAGE: null,
    SIDE_EDIT_COLLECTION: null,
    SIDE_SYNC_COLLECTION: null,
    SIDE_CREATE_FOLDER: null,
    SIDE_DELETE_COLLECTION: null,
    SIDE_EDIT_FOLDER: null,
    SIDE_DELETE_FOLDER: null,
    SIDE_SAVE_NEW_REQUEST: null,
    SIDE_DELETE_REQUEST: null,
    SIDE_EDIT_REQUEST: null,
    SIDE_MOVE_REQUEST: null,
    // req tab action
    REQ_TAB_ADD: null,
    REQ_TAB_REMOVE: null,
    REQ_TAB_CHANGE: null,
    REQ_TAB_SAVE: null,
    REQ_TAB_CHANGE_ACTIVE_INDEX: null,
    REQ_TAB_SET_DIRTY: null,
    // req content action
    REQ_CONTENT_CHANGE_ACTIVE_INDEX: null,
    REQ_CONTENT_CHANGE_METHOD: null,
    REQ_CONTENT_FILL_URL_PARAMS: null,
    REQ_CONTENT_ADD: null,
    REQ_CONTENT_REMOVE: null,
    REQ_CONTENT_UPDATE_BY_REQUEST: null,
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
    // body raw json kv action
    REQ_BODY_RAW_JSON_TOGGLE_KV: null,
    REQ_BODY_RAW_JSON_ADD_KV: null,
    REQ_BODY_RAW_JSON_REMOVE_KV: null,
    REQ_BODY_RAW_JSON_CHANGE_KV_KEY: null,
    REQ_BODY_RAW_JSON_CHANGE_KV_VALUE: null,
    REQ_BODY_RAW_JSON_CHANGE_KV_VALUE_TYPE: null,
    REQ_BODY_RAW_JSON_CHANGE_KV_CHILD_VALUE_TYPE: null,
    // body form data kv action
    REQ_BODY_FORMDATA_TOGGLE_KV: null,
    REQ_BODY_FORMDATA_ADD_KV: null,
    REQ_BODY_FORMDATA_REMOVE_KV: null,
    REQ_BODY_FORMDATA_CHANGE_KV_KEY: null,
    REQ_BODY_FORMDATA_CHANGE_KV_VALUE: null,
    REQ_BODY_FORMDATA_CHANGE_KV_VALUE_TYPE: null,
    REQ_BODY_FORMDATA_CHANGE_KV_FILE_VALUE: null,
    // body x form kv action
    REQ_BODY_XFORM_TOGGLE_KV: null,
    REQ_BODY_XFORM_ADD_KV: null,
    REQ_BODY_XFORM_REMOVE_KV: null,
    REQ_BODY_XFORM_CHANGE_KV_KEY: null,
    REQ_BODY_XFORM_CHANGE_KV_VALUE: null,
    REQ_BODY_XFORM_CHANGE_KV_VALUE_TYPE: null,
    // body binary file input change action
    REQ_BODY_BINARY_FILE: null,
    // response actions
    RES_TOGGLE_PRETTY_TYPE_LIST: null,
    RES_CHANGE_PRETTY_TYPE_VALUE: null,
    RES_CHANGE_SHOW_TYPE: null,
    RES_EMIT_CHANGE: null,
    // response checker kv action
    RES_CHECKER_TOGGLE_KV: null,
    RES_CHECKER_ADD_KV: null,
    RES_CHECKER_REMOVE_KV: null,
    RES_CHECKER_CHANGE_KV_KEY: null,
    RES_CHECKER_CHANGE_KV_VALUE_TYPE: null,
    RES_CHECKER_CHANGE_KV_CHILD_VALUE_TYPE: null,
    // modal actions
    MODAL_CLOSE: null,
    MODAL_OPEN: null,
    MODAL_EDIT_COLL_HOST: null,
    MODAL_EDIT_COLLECTION: null,
    MODAL_SYNC_COLLECTION: null,
    MODAL_RUN_COLLECTION: null,
    MODAL_EDIT_FOLDER_HOST: null,
    MODAL_SAVE_BLANK_URL_TIP: null,
    MODAL_SAVE_NEW_REQUEST: null,
    MODAL_LEAVING_DIRTY_TAB: null,
    MODAL_CLOSING_DIRTY_TAB: null,
    MODAL_CREATE_COLLECTION: null,
    MODAL_IMPORT_COLLECTION: null,
    MODAL_CLEAR_LOCAL_STORAGE: null,
    MODAL_DELETE_COLLECTION: null,
    MODAL_CREATE_FOLDER: null,
    MODAL_EDIT_FOLDER: null,
    MODAL_DELETE_FOLDER: null,
    MODAL_EDIT_REQUEST: null,
    MODAL_MOVE_REQUEST: null,
    MODAL_DELETE_REQUEST: null
})

export default AppConstants
