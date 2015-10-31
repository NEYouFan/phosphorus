//author @huntbao
'use strict'

import ReqTabStore from '../../stores/reqtabstore'
import ReqConTabStore from '../../stores/reqtabconstore'

let Requester = {

    // https://github.com/bitinn/node-fetch
    fetch(callback) {
        let tabState = ReqTabStore.getAll().reqTab
        let tabConState = ReqConTabStore.getAll().reqTabCon
        console.log(tabState)
        console.log(tabConState)
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
        let res
        fetch(url, fetchOptions).then(function (response) {
            res = response
            return response.text()
        }).then(function (data) {
            callback(res, data)
        }).catch(function (err) {
            callback(res, err)
        })
    }
}

export default Requester