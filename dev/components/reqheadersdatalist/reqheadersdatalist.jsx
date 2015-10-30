//author @huntbao
'use strict'

import React from 'react'
import reqHeaders from '../../libs/httpreqheaders'

class ReqHeadersDataList extends React.Component {

    render() {
        let nodes = reqHeaders.map((item, index) => {
            return (
                <option value={item} key={index}/>
            )
        })
        return (
            <datalist id="reqheadersdatalist">
                {nodes}
            </datalist>
        )
    }

}

export default ReqHeadersDataList
