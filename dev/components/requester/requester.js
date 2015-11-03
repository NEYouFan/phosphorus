//author @huntbao
'use strict'

import ReqTabStore from '../../stores/reqtabstore'
import ReqConTabStore from '../../stores/reqtabconstore'

let Requester = {

    fetch(callback) {
        let tabState = ReqTabStore.getAll().reqTab
        let tabConState = ReqConTabStore.getAll().reqTabCon
        let tabIndex = tabState.activeIndex
        let tab = tabState.tabs[tabIndex]
        let tabCon = tabConState.reqCons[tabIndex]
        let method = tab.method
        let url = tab.rurl
        let headers = {}
        tabCon.builders.headerKVs.map((kv) => {
            if (kv.key && kv.value) {
                headers[kv.key] = kv.value
            }
        })
        let fetchOptions = {
            credentials: 'include',
            method: method,
            headers: headers
        }
        // deal form-data
        let bodyType = tabCon.builders.bodyType.type
        if (method !== 'GET') {
            if (bodyType === 'form-data') {
                let fd = new FormData()
                tabCon.builders.bodyFormDataKVs.map((kv) => {
                    if (kv.key) {
                        if (kv.valueType === 'text' && kv.value) {
                            fd.append(kv.key, kv.value)
                        } else if (kv.valueType === 'file' && kv.fileInput && kv.fileInput.files[0]) {
                            fd.append(kv.key, kv.fileInput.files[0])
                        }
                    }
                })
                fetchOptions.body = fd
            } else if (bodyType === 'x-www-form-urlencoded') {
                let fd = new FormData()
                tabCon.builders.bodyXFormKVs.map((kv) => {
                    if (kv.key && kv.value) {
                        fd.append(kv.key, kv.value)
                    }
                })
                fetchOptions.body = fd
            } else if (bodyType === 'raw') {
                fetchOptions.body = tabCon.builders.bodyRawData
            }
        }
        let res
        let startTime = Date.now()
        console.log(fetchOptions)
        fetch(url, fetchOptions).then(function (response) {
            res = response
            res.time = Date.now() - startTime
            return response.text()
        }).then(function (data) {
            callback(res, data)
        }).catch(function (err) {
            callback(res, err)
        })

    }
}

export default Requester