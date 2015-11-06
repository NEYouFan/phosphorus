//author @huntbao
'use strict'
import './neireqbuilderurlparams.styl'
import ReqBuilderURLParams from './reqbuilderurlparams.jsx'
import ReqURLParamsAction from '../../actions/requrlparamsaction'

class NEIReqBuilderURLParams extends ReqBuilderURLParams {

    toggleURLParamsKV(rowIndex) {
        // to nothing
    }

    addURLParamsKV() {
        // to nothing
    }

    changeURLParamsKVValue(rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVValue(rowIndex, value)
    }

}


export default NEIReqBuilderURLParams