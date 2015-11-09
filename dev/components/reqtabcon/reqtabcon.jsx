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
import NEIReqURL from '../requrl/neirequrl.jsx'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqBuilderTab from '../reqbuildertab/reqbuildertab.jsx'
import ReqBuilderHeader from '../reqbuilderheader/reqbuilderheader.jsx'
import ReqBuilderURLParams from '../reqbuilderurlparams/reqbuilderurlparams.jsx'
import NEIReqBuilderURLParams from '../reqbuilderurlparams/neireqbuilderurlparams.jsx'
import ReqBuilderBody from '../reqbuilderbody/reqbuilderbody.jsx'
import Res from '../res/res.jsx'

class ReqTabCon extends React.Component {

    render() {
        let activeTabIndex = this.props.activeTabIndex
        let tabConNodes = this.props.reqTabs.map((tab, index) => {
            let tabConClasses = classNames({
                'reqtab-con': true,
                'hide': activeTabIndex !== index
            })
            let tabCons = this.props.tabCons
            let builders = tabCons.reqCons[index].builders
            let reqURLProps = {
                tabIndex: index,
                tab: tab,
                tabCon: tabCons[index],
                reqMethods: tabCons.reqMethods,
                showMethodList: tabCons.reqCons[index].showReqMethodList
            }
            let reqBuilderURLParamsProps = {
                tabIndex: index,
                builders: builders
            }
            let reqURL
            let reqBuilderURLParams
            if (tab.isNEI) {
                // nei tab
                reqURLProps.modClass = 'nei-requrl'
                reqURLProps.urlReadOnly = true
                reqURL = <NEIReqURL {...reqURLProps} />

                reqBuilderURLParamsProps.modClass = 'nei-reqbuilder-urlparams'
                for (let i = builders.paramKVs.length - 1; i >= 0; i--) {
                    if (builders.paramKVs[i].key) {
                        builders.paramKVs[i].readonly = true
                    } else {
                        // remove if key is blank
                        builders.paramKVs.splice(i, 1)
                    }
                }
                reqBuilderURLParams = <NEIReqBuilderURLParams {...reqBuilderURLParamsProps} />

            } else {
                // normal tab
                reqURL = <ReqURL {...reqURLProps} />
                reqBuilderURLParams = <ReqBuilderURLParams {...reqBuilderURLParamsProps} />
            }
            return (
                <div className={tabConClasses} key={index}>
                    {reqURL}
                    <ReqBuilderTab
                        tabIndex={index}
                        builders={builders}
                        />
                    {reqBuilderURLParams}
                    <ReqBuilderBody
                        tabIndex={index}
                        bodyTypes={tabCons.bodyTypes}
                        rawTypes={tabCons.rawTypes}
                        builders={builders}
                        showRawTypeList={tabCons.reqCons[index].showBodyRawTypeList}
                        />
                    <ReqBuilderHeader
                        tabIndex={index}
                        builders={builders}
                        />
                    <Res
                        tabIndex={index}
                        prettyTypes={tabCons.prettyTypes}
                        builders={builders}
                        tab={tab}
                        showPrettyTypeList={tabCons.reqCons[index].showResPrettyTypeList}
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