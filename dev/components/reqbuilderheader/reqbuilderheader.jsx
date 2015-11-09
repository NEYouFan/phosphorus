//author @huntbao
'use strict'
import './reqbuilderheader.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqHeaderAction from '../../actions/reqheaderaction'
import ReqTabAction from '../../actions/reqtabaction'

class ReqBuilderHeader extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'Request Headers'
        })
        return (
            <div className={className}>
                <div className="mod-reqbuilder-header">
                    <KeyValue
                        kvs={this.props.builders.headerKVs}
                        toggleKV={(rowIndex) => {this.toggleHeaderKV(rowIndex)}}
                        addKV={() => {this.addHeaderKV()}}
                        removeKV={(rowIndex) => {this.removeHeaderKV(rowIndex)}}
                        changeKVKey={(rowIndex, value) => {this.changeHeaderKVKey(rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeHeaderKVValue(rowIndex, value)}}
                        />
                </div>
            </div>
        )
    }

    toggleHeaderKV(rowIndex) {
        ReqHeaderAction.toggleHeaderKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addHeaderKV() {
        ReqHeaderAction.addHeaderKV()
    }

    removeHeaderKV(rowIndex) {
        ReqHeaderAction.removeHeaderKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    changeHeaderKVKey(rowIndex, value) {
        ReqHeaderAction.changeHeaderKVKey(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeHeaderKVValue(rowIndex, value) {
        ReqHeaderAction.changeHeaderKVValue(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

}


export default ReqBuilderHeader