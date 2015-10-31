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
import ReqBuilderTab from '../reqbuildertab/reqbuildertab.jsx'
import ReqBuilderHeader from '../reqbuilderheader/reqbuilderheader.jsx'
import ReqBuilderURLParams from '../reqbuilderurlparams/reqbuilderurlparams.jsx'
import ReqBuilderBody from '../reqbuilderbody/reqbuilderbody.jsx'
import Res from '../res/res.jsx'

/** @namespace this.props.tabCons */
class ReqTabCon extends React.Component {

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
                        tabCon={this.props.tabCons[index]}
                        reqMethods={this.props.tabCons.reqMethods}
                        showMethodList={this.props.tabCons.reqCons[index].showReqMethodList}
                        />
                    <ReqBuilderTab
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
                    <ReqBuilderURLParams
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
                    <ReqBuilderBody
                        tabIndex={index}
                        bodyTypes={this.props.tabCons.bodyTypes}
                        rawTypes={this.props.tabCons.rawTypes}
                        builders={this.props.tabCons.reqCons[index].builders}
                        showRawTypeList={this.props.tabCons.reqCons[index].showBodyRawTypeList}
                        />
                    <ReqBuilderHeader
                        tabIndex={index}
                        builders={this.props.tabCons.reqCons[index].builders}
                        />
                    <Res
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

}


export default ReqTabCon