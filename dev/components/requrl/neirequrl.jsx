//author @huntbao
'use strict'

import './neirequrl.styl'
import ReqURL from './requrl.jsx'

class NEIReqURL extends ReqURL {

    toggleMethodList(evt) {
        evt.stopPropagation()
    }

    onFocus(evt) {
        evt.stopPropagation()
    }

}


export default NEIReqURL