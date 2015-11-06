//author @huntbao
'use strict'
import './neireqbuilderurlparams.styl'
import ReqBuilderURLParams from './reqbuilderurlparams.jsx'
import ReqURLParamsAction from '../../actions/requrlparamsaction'

class NEIReqBuilderURLParams extends ReqBuilderURLParams {

    toggleURLParamsKV(rowIndex) {
        // do nothing
    }

    addURLParamsKV() {
        // do nothing
    }

    changeURLParamsKVValue(rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVValue(rowIndex, value)
    }

}


export default NEIReqBuilderURLParams