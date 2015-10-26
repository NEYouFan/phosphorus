//author @huntbao
'use strict'

import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ReqURL from '../requrl/requrl.jsx'

/** @namespace this.props.tabCons */
let ReqTabCon = React.createClass({

    render() {
        let activeTabIndex = ReqTabStore.getActiveTabIndex()
        let tabConNodes = this.props.tabs.map((tab, index) => {
            let tabConClasses = classNames({
                'reqtab-con': true,
                'hide': activeTabIndex !== index
            })
            return (
                <div className={tabConClasses} key={index}>
                    <ReqURL tabCons={this.props.tabCons} />
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