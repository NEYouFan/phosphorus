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
                        tabCon={this.props.tabCons[index]}
                        reqMethods={this.props.tabCons.reqMethods}
                        showMethodList={this.props.tabCons.reqCons[index].showReqMethodList}
                        />
                    <KeyValue
                        showKV={this.props.tabCons.reqCons[index].showParamKV}
                        kvs={this.props.tabCons.reqCons[index].paramKVs}
                        toggleKV={(rowIndex) => {this.toggleKV(index, rowIndex)}}
                        addKV={() => {this.addKV(index)}}
                        removeKV={(rowIndex) => {this.removeKV(index, rowIndex)}}
                        editKV={() => {this.editKV(index)}}
                        changeKVKey={(rowIndex, value) => {this.changeKVKey(index, rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeKVValue(index, rowIndex, value)}}
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
                        bodyTypes={this.props.tabCons.bodyTypes}
                        rawTypes={this.props.tabCons.rawTypes}
                        builders={this.props.tabCons.reqCons[index].builders}
                        showRawTypeList={this.props.tabCons.reqCons[index].showBodyRawTypeList}
                        />
                </div>
            )
        })
        return (
            <div className="mod-reqtab-cons">
                {tabConNodes}
            </div>
        )
    },

    toggleKV(tabIndex, rowIndex) {
        ReqTabConAction.toggleCheckParam(tabIndex, rowIndex)
    },

    addKV(tabIndex) {
        ReqTabConAction.addParamRow(tabIndex)
    },

    removeKV(tabIndex, rowIndex) {
        ReqTabConAction.removeParamRow(tabIndex, rowIndex)
    },

    editKV(tabIndex) {
        ReqTabConAction.editParam(tabIndex)
    },

    changeKVKey(tabIndex, rowIndex, value) {
        ReqTabConAction.changeParamKey(tabIndex, rowIndex, value)
    },

    changeKVValue(tabIndex, rowIndex, value) {
        ReqTabConAction.changeParamValue(tabIndex, rowIndex, value)
    }

})


export default ReqTabCon