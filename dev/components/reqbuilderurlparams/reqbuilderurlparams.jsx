//author @huntbao
'use strict'
import './reqbuilderurlparams.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqURLParamsAction from '../../actions/requrlparamsaction'

let ReqBuilderURLParams = React.createClass({

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'URL Params'
        })
        let tabIndex = this.props.tabIndex
        return (
            <div className={className}>
                <div className="mod-reqbuilder-urlparams">
                    <KeyValue
                        kvs={this.props.builders.paramKVs}
                        toggleKV={(rowIndex) => {this.toggleURLParamsKV(tabIndex, rowIndex)}}
                        addKV={() => {this.addURLParamsKV(tabIndex)}}
                        removeKV={(rowIndex) => {this.removeURLParamsKV(tabIndex, rowIndex)}}
                        editKV={() => {this.editURLParamsKV(tabIndex)}}
                        changeKVKey={(rowIndex, value) => {this.changeURLParamsKVKey(tabIndex, rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeURLParamsKVValue(tabIndex, rowIndex, value)}}
                        />
                </div>
            </div>
        )
    },

    toggleURLParamsKV(tabIndex, rowIndex) {
        ReqURLParamsAction.toggleURLParamsKV(tabIndex, rowIndex)
    },

    addURLParamsKV(tabIndex) {
        ReqURLParamsAction.addURLParamsKV(tabIndex)
    },

    removeURLParamsKV(tabIndex, rowIndex) {
        ReqURLParamsAction.removeURLParamsKV(tabIndex, rowIndex)
    },

    editURLParamsKV(tabIndex) {
        ReqURLParamsAction.editURLParamsKV(tabIndex)
    },

    changeURLParamsKVKey(tabIndex, rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVKey(tabIndex, rowIndex, value)
    },

    changeURLParamsKVValue(tabIndex, rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVValue(tabIndex, rowIndex, value)
    }

})


export default ReqBuilderURLParams