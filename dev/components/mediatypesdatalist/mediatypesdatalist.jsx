//author @huntbao
'use strict'

import React from 'react'
import mediaTypes from '../../libs/mediatypes'

let MediaTypesDataList = React.createClass({

    render() {
        let nodes = mediaTypes.map((item, index) => {
            return (
                <option value={item} key={index}/>
            )
        })
        return (
            <datalist id="mediatypesdatalist">
                {nodes}
            </datalist>
        )
    }

})

export default MediaTypesDataList
