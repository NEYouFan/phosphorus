//author @huntbao
'use strict'
import './reqbuilderurlparams.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValue from '../keyvalue/keyvalue.jsx'
import ReqURLParamsAction from '../../actions/requrlparamsaction'

class ReqBuilderURLParams extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'URL Params'
        })
        return (
            <div className={className}>
                <div className="mod-reqbuilder-urlparams">
                    <KeyValue
                        kvs={this.props.builders.paramKVs}
                        toggleKV={(rowIndex) => {this.toggleURLParamsKV(rowIndex)}}
                        addKV={() => {this.addURLParamsKV()}}
                        removeKV={(rowIndex) => {this.removeURLParamsKV(rowIndex)}}
                        editKV={() => {this.editURLParamsKV()}}
                        changeKVKey={(rowIndex, value) => {this.changeURLParamsKVKey(rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeURLParamsKVValue(rowIndex, value)}}
                        />
                </div>
            </div>
        )
    }

    toggleURLParamsKV(rowIndex) {
        ReqURLParamsAction.toggleURLParamsKV(rowIndex)
    }

    addURLParamsKV() {
        ReqURLParamsAction.addURLParamsKV()
    }

    removeURLParamsKV(rowIndex) {
        ReqURLParamsAction.removeURLParamsKV(rowIndex)
    }

    editURLParamsKV() {
        ReqURLParamsAction.editURLParamsKV()
    }

    changeURLParamsKVKey(rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVKey(rowIndex, value)
    }

    changeURLParamsKVValue(rowIndex, value) {
        ReqURLParamsAction.changeURLParamsKVValue(rowIndex, value)
    }

}


export default ReqBuilderURLParams