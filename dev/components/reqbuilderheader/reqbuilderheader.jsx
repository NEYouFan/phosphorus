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
        let modClass = 'mod-reqbuilder-header ' + (this.props.modClass || '')
        let header
        if (this.props.builders.headerKVs.length) {
            let props = {
                kvs: this.props.builders.headerKVs,
                toggleKV: (rowIndex) => {
                    this.toggleHeaderKV(rowIndex)
                },
                addKV: () => {
                    this.addHeaderKV()
                },
                removeKV: (rowIndex) => {
                    this.removeHeaderKV(rowIndex)
                },
                changeKVKey: (rowIndex, value) => {
                    this.changeHeaderKVKey(rowIndex, value)
                },
                changeKVValue: (rowIndex, value) => {
                    this.changeHeaderKVValue(rowIndex, value)
                }
            }
            header = <KeyValue {...props} />
        } else {
            header = (
                <div>
                    <em className="glyphicon glyphicon-exclamation-sign"></em>
                    <span>This request url has no headers.</span>
                </div>
            )
        }
        return (
            <div className={className}>
                <div className={modClass}>
                    {header}
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