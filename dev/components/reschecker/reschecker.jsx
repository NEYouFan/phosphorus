//author @huntbao
'use strict'
import './reschecker.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValueT from '../keyvalue/keyvaluet.jsx'
import ResCheckerAction from '../../actions/rescheckeraction'
import ReqTabAction from '../../actions/reqtabaction'

class ResChecker extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'Response Checker'
        })
        return (
            <div className={className}>
                <div className="mod-res-checker">
                    <KeyValueT
                        kvs={this.props.builders.resCheckerKVs}
                        toggleKV={(rowIndex) => {this.toggleResCheckerKV(rowIndex)}}
                        addKV={() => {this.addResCheckerKV()}}
                        removeKV={(rowIndex) => {this.removeResCheckerKV(rowIndex)}}
                        changeKVKey={(rowIndex, value) => {this.changeResCheckerKVKey(rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeResCheckerKVValue(rowIndex, value)}}
                        changeKVValueType={(rowIndex, value) => {this.changeResCheckerKVValueType(rowIndex, value)}}
                        />
                </div>
            </div>
        )
    }

    toggleResCheckerKV(rowIndex) {
        ResCheckerAction.toggleResCheckerKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addResCheckerKV() {
        ResCheckerAction.addResCheckerKV()
    }

    removeResCheckerKV(rowIndex) {
        ResCheckerAction.removeResCheckerKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    changeResCheckerKVKey(rowIndex, value) {
        ResCheckerAction.changeResCheckerKVKey(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeResCheckerKVValue(rowIndex, value) {
        ResCheckerAction.changeResCheckerKVValue(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeResCheckerKVValueType(rowIndex, value) {
        ResCheckerAction.changeResCheckerKVValueType(rowIndex, value)
    }

}


export default ResChecker