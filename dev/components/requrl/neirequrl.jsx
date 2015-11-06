//author @huntbao
'use strict'

import './neirequrl.styl'
import ReqURL from './requrl.jsx'

class NEIReqURL extends ReqURL {

    constructor(props) {
        super(props)
        this.state = {
            modClass: 'mod-requrl nei-requrl',
            urlReadOnly: true
        }
    }

    toggleMethodList(evt) {
        evt.stopPropagation()
    }

    onFocus(evt) {
        evt.stopPropagation()
    }

}


export default NEIReqURL