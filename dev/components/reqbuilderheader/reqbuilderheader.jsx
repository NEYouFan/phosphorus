//author @huntbao
'use strict'
import './reqbuilderheader.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqHeaderAction from '../../actions/reqheaderaction'

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
                        editKV={() => {this.editHeaderKV()}}
                        changeKVKey={(rowIndex, value) => {this.changeHeaderKVKey(rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeHeaderKVValue(rowIndex, value)}}
                        />
                </div>
            </div>
        )
    }

    toggleHeaderKV(rowIndex) {
        ReqHeaderAction.toggleHeaderKV(rowIndex)
    }

    addHeaderKV() {
        ReqHeaderAction.addHeaderKV()
    }

    removeHeaderKV(rowIndex) {
        ReqHeaderAction.removeHeaderKV(rowIndex)
    }

    editHeaderKV() {
        ReqHeaderAction.editHeaderKV()
    }

    changeHeaderKVKey(rowIndex, value) {
        ReqHeaderAction.changeHeaderKVKey(rowIndex, value)
    }

    changeHeaderKVValue(rowIndex, value) {
        ReqHeaderAction.changeHeaderKVValue(rowIndex, value)
    }

}


export default ReqBuilderHeader