//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'

let ReqTab = React.createClass({

    render() {
        let that = this
        let tabNodes = that.props.tabs.map(function (tab, index) {
            let tabClassName = 'mod-reqtab'
            tab.active && (tabClassName += ' active')
            tab.id = index
            return (
                <div className={tabClassName} key={tab.id}>
                    <div className="reqtab-box"></div>
                    <span className="reqtab-name">{tab.name}</span>
                </div>
            )
        })
        return (
            <div className="clr req-tab-wrap">
                {tabNodes}
            </div>
        )
    }

})


export default ReqTab