//author @huntbao
'use strict'
import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabStore from '../../stores/reqtabstore'

/** @namespace this.props.tabCons */
let ReqTabCon = React.createClass({

    getInitialState() {
        return {}
    },

    render() {
        let activeTabIndex = ReqTabStore.getActiveTabIndex()
        let tabConNodes = this.props.tabs.map((tab, index) => {
            let tabConClasses = classNames({
                'reqtab-con': true,
                'hide': activeTabIndex !== index
            })
            let tabContent = this.props.tabCons[index].name
            return (
                <div className={tabConClasses} key={index}>
                    {tabContent}
                </div>
            )
        })
        return (
            <div className="mod-reqtab-cons">
                {tabConNodes}
            </div>
        )
    }

})


export default ReqTabCon