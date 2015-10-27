//author @huntbao
'use strict'

import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ReqURL from '../requrl/requrl.jsx'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqBuilderTab from '../reqbuildertab/reqbuildertab'
import ReqBuilderHeader from '../reqbuilderheader/reqbuilderheader'
import ReqBuilderBody from '../reqbuilderbody/reqbuilderbody'

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
                    <ReqURL
                        tab={tab}
                        tabCons={this.props.tabCons}
                        tabIndex={index}
                        />
                    <KeyValue
                        tabIndex={index}
                        tabCons={this.props.tabCons}
                        kvs={this.props.tabCons.reqCons[index].paramsKVs}
                        />
                    <ReqBuilderTab tabIndex={index} tabCon={this.props.tabCons.reqCons[index]}/>
                    <ReqBuilderHeader tabIndex={index} tabCon={this.props.tabCons.reqCons[index]}/>
                    <ReqBuilderBody tabIndex={index} tabCon={this.props.tabCons.reqCons[index]}/>
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