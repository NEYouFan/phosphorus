//author @huntbao
'use strict'

import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
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
import NEIReqBuilderBody from '../reqbuilderbody/neireqbuilderbody.jsx'
import ResChecker from '../reschecker/reschecker.jsx'
import NEIResChecker from '../reschecker/neireschecker.jsx'
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
            let reqBuilderBodyProps = {
                tabIndex: index,
                bodyTypes: builders.bodyTypes,
                rawTypes: tabCons.rawTypes,
                builders: builders,
                showRawTypeList: tabCons.reqCons[index].showBodyRawTypeList
            }
            let resCheckerProps = {
                tabIndex: index,
                builders: builders,
                tab: tab
            }
            let reqURL
            let reqBuilderURLParams
            let reqBuilderBody
            let resChecker
            if (tab.isNEI) {
                // nei tab
                // req url
                reqURLProps.modClass = 'nei-requrl'
                reqURLProps.urlReadOnly = true
                reqURL = <NEIReqURL {...reqURLProps} />
                // req builder url params
                _.remove(builders.paramKVs, (kv) => {
                    kv.readonly = true
                    return !kv.key
                })
                reqBuilderURLParamsProps.modClass = 'nei-reqbuilder-urlparams'
                reqBuilderURLParams = <NEIReqBuilderURLParams {...reqBuilderURLParamsProps} />
                // req builder body
                _.remove(builders.bodyXFormKVs, (kv) => {
                    kv.readonly = true
                    return !kv.key
                })
                _.remove(builders.bodyFormDataKVs, (kv) => {
                    kv.readonly = true
                    return !kv.key
                })
                reqBuilderBody = <NEIReqBuilderBody {...reqBuilderBodyProps}/>
                // response checker
                resChecker = <NEIResChecker {...resCheckerProps} />
            } else {
                // normal tab
                reqURL = <ReqURL {...reqURLProps} />
                reqBuilderURLParams = <ReqBuilderURLParams {...reqBuilderURLParamsProps} />
                reqBuilderBody = <ReqBuilderBody {...reqBuilderBodyProps}/>
                resChecker = <ResChecker {...resCheckerProps} />
            }
            return (
                <div className={tabConClasses} key={index}>
                    {reqURL}
                    <ReqBuilderTab
                        tabIndex={index}
                        builders={builders}
                        />
                    {reqBuilderURLParams}
                    {reqBuilderBody}
                    <ReqBuilderHeader
                        tabIndex={index}
                        builders={builders}
                        />
                    {resChecker}
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