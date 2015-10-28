//author @huntbao
'use strict'
import './reqbuilderheader.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqHeaderAction from '../../actions/reqheaderaction'

let ReqBuilderHeader = React.createClass({

    render() {
        let className = classNames({
            hide: this.props.builders.activeIndex !== 0
        })
        let tabIndex = this.props.tabIndex
        return (
            <div className={className}>
                <div className="mod-reqbuilder-header">
                    <KeyValue
                        showKV={true}
                        kvs={this.props.builders.headerKVs}
                        toggleKV={(rowIndex) => {this.toggleKV(tabIndex, rowIndex)}}
                        addKV={() => {this.addKV(tabIndex)}}
                        removeKV={(rowIndex) => {this.removeKV(tabIndex, rowIndex)}}
                        editKV={() => {this.editKV(tabIndex)}}
                        changeKVKey={(rowIndex, value) => {this.changeKVKey(tabIndex, rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeKVValue(tabIndex, rowIndex, value)}}
                        />
                </div>
            </div>
        )
    },

    toggleKV(tabIndex, rowIndex) {
        ReqHeaderAction.toggleCheckHeader(tabIndex, rowIndex)
    },

    addKV(tabIndex) {
        ReqHeaderAction.addHeaderRow(tabIndex)
    },

    removeKV(tabIndex, rowIndex) {
        ReqHeaderAction.removeHeaderRow(tabIndex, rowIndex)
    },

    editKV(tabIndex) {
        ReqHeaderAction.editHeader(tabIndex)
    },

    changeKVKey(tabIndex, rowIndex, value) {
        ReqHeaderAction.changeHeaderKey(tabIndex, rowIndex, value)
    },

    changeKVValue(tabIndex, rowIndex, value) {
        ReqHeaderAction.changeHeaderValue(tabIndex, rowIndex, value)
    }

})


export default ReqBuilderHeader