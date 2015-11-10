//author @huntbao
'use strict'
import ReqBuilderBody from './reqbuilderbody.jsx'

class NEIReqBuilderBody extends ReqBuilderBody {

    onChange(evt) {
        // do nothing
    }

    toggleRawTypeList(evt) {
        evt.stopPropagation()
        // do nothing
    }

    onSelectRawTypeValue(bodyType) {
        // do nothing
    }

    toggleBodyFormDataKV(rowIndex,kv) {
        // do nothing
    }

    addBodyFormDataKV() {
        // do nothing
    }

    removeBodyFormDataKV(rowIndex) {
        // do nothing
    }

    toggleBodyXFormKV(rowIndex, kv) {
        // do nothing
    }

    addBodyXFormKV() {
        // do nothing
    }

    removeBodyXFormKV(rowIndex) {
        // do nothing
    }
}


export default NEIReqBuilderBody