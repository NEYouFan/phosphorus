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
        let activeTabIndex = this.props.activeTabIndex
        let tabConNodes = this.props.reqTabs.map((tab, index) => {
            let tabConClasses = classNames({
                'reqtab-con': true,
                'hide': activeTabIndex !== index
            })
            return (
                <div className={tabConClasses} key={index}>
                    <ReqURL
                        tabIndex={index}
                        tab={tab}
                        tabCons={this.props.tabCons}
                        />
                    <KeyValue
                        tabIndex={index}
                        tabCon={this.props.tabCons.reqCons[index]}
                        kvs={this.props.tabCons.reqCons[index].paramsKVs}
                        />
                    <ReqBuilderTab
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
                    <ReqBuilderHeader
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
                    <ReqBuilderBody
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
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