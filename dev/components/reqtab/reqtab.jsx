//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'

let ReqTab = React.createClass({

    render() {
        let tabs = this.props.tabs
        return (
            <div className={tabs ? '' : 'hide'}>
                <div className="mod-reqtab">reqtab</div>
            </div>
        )
    }

})


export default ReqTab