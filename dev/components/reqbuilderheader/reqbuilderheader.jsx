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
        let tabIndex = this.props.tabIndex
        return (
            <div className={className}>
                <div className="mod-reqbuilder-header">
                    <KeyValue
                        kvs={this.props.builders.headerKVs}
                        toggleKV={(rowIndex) => {this.toggleHeaderKV(tabIndex, rowIndex)}}
                        addKV={() => {this.addHeaderKV(tabIndex)}}
                        removeKV={(rowIndex) => {this.removeHeaderKV(tabIndex, rowIndex)}}
                        editKV={() => {this.editHeaderKV(tabIndex)}}
                        changeKVKey={(rowIndex, value) => {this.changeHeaderKVKey(tabIndex, rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeHeaderKVValue(tabIndex, rowIndex, value)}}
                        />
                </div>
            </div>
        )
    }

    toggleHeaderKV(tabIndex, rowIndex) {
        ReqHeaderAction.toggleHeaderKV(tabIndex, rowIndex)
    }

    addHeaderKV(tabIndex) {
        ReqHeaderAction.addHeaderKV(tabIndex)
    }

    removeHeaderKV(tabIndex, rowIndex) {
        ReqHeaderAction.removeHeaderKV(tabIndex, rowIndex)
    }

    editHeaderKV(tabIndex) {
        ReqHeaderAction.editHeaderKV(tabIndex)
    }

    changeHeaderKVKey(tabIndex, rowIndex, value) {
        ReqHeaderAction.changeHeaderKVKey(tabIndex, rowIndex, value)
    }

    changeHeaderKVValue(tabIndex, rowIndex, value) {
        ReqHeaderAction.changeHeaderKVValue(tabIndex, rowIndex, value)
    }

}


export default ReqBuilderHeader