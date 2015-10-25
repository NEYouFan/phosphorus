//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'
import classNames from 'classnames'

let ReqTab = React.createClass({

    render() {
        let tabNodes = this.props.tabs.map((tab, index) => {
            let tabClasses = classNames({
                reqtab: true,
                active: tab.active
            })
            return (
                <div className={tabClasses} key={index}>
                    <div className="reqtab-box"></div>
                    <span className="reqtab-name" onClick={this.clickHandler.bind(this, index)}>{tab.name}</span>
                </div>
            )
        })
        return (
            <div className="clr mod-reqtabs">
                {tabNodes}
            </div>
        )
    },

    clickHandler(tabIndex, evt) {
        let tab = evt.target.parentNode
        if (tab.classList.contains('active')) return

    }

})


export default ReqTab