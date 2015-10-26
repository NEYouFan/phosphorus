//author @huntbao
'use strict'

import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabConActions from '../../actions/reqtabconaction'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ReqURL from '../requrl/requrl.jsx'
import KeyValue from '../keyvalue/keyvalue.jsx'

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
                    <ReqURL tab={tab} tabCons={this.props.tabCons} index={index}/>
                    <KeyValue
                        kvs={this.props.tabCons.reqCons[index].paramsKVs}
                        tabIndex={index}
                        toggleCheck={this.toggleCheckParam}
                        addKVRow={this.addParamsKVRow}
                        removeKVRow={this.removeParamsKVRow}
                        editKV={this.editKV}
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

    toggleCheckParam(tabIndex, rowIndex) {
        ReqTabConActions.toggleCheckParam(tabIndex, rowIndex)
    },

    addParamsKVRow(tabIndex) {
        ReqTabConActions.addParamsKVRow(tabIndex)
    },

    removeParamsKVRow(tabIndex, rowIndex) {
        ReqTabConActions.removeParamsKVRow(tabIndex, rowIndex)
    },

    editKV() {
        ReqTabConActions.editKV()
    }

})


export default ReqTabCon