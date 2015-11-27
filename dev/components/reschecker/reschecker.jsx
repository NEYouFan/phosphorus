//author @huntbao
'use strict'
import './reschecker.styl'
import React from 'react'
import classNames from 'classnames'
import KeyValueT from '../keyvalue/keyvaluet.jsx'
import ResCheckerAction from '../../actions/rescheckeraction'
import ReqTabAction from '../../actions/reqtabaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

class ResChecker extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'Response Checker'
        })
        let checkResult
        let resCheckerResult = this.props.builders.resCheckerResult
        if (resCheckerResult !== null && resCheckerResult !== true) {
            checkResult = <div className="error-tip">{resCheckerResult.info}</div>
        }
        let mainCon
        let kvs = this.props.builders.resCheckerKVs
        if (kvs === null) {
            mainCon = null
        } else if (kvs === 'Circular Reference') {
            mainCon =
                <div className="error-tip">
                    Outputs parameters exists Circular Reference, please check it.
                </div>
        } else {
            mainCon =
                <KeyValueT
                    jsonType={this.props.builders.resJSONType}
                    kvs={kvs}
                    toggleKV={(rowIndex) => {this.toggleResCheckerKV(rowIndex)}}
                    addKV={(rowIndex,kv) => {this.addResCheckerKV(rowIndex,kv)}}
                    removeKV={(rowIndex) => {this.removeResCheckerKV(rowIndex)}}
                    changeKVKey={(rowIndex, value) => {this.changeResCheckerKVKey(rowIndex, value)}}
                    changeKVValue={(rowIndex, value) => {this.changeResCheckerKVValue(rowIndex, value)}}
                    changeKVValueType={(rowIndex, value) => {this.changeResCheckerKVValueType(rowIndex, value)}}
                    changeKVChildValueType={(rowIndex, value) => {this.changeResCheckerKVChildValueType(rowIndex, value)}}
                    />
        }
        let jsonTypeclasses = classNames({
            'select-wrap': true,
            'show-list': this.props.showJSONTypeList
        })
        return (
            <div className={className}>
                <div className="mod-res-checker">
                    <div className="res-checker-tip">
                        <em className="glyphicon glyphicon-exclamation-sign"></em>
                        <span>Response Checker is mainly for checking JSON data response result. You can define your response JSON data's structure here.</span>
                    </div>
                    <span className={jsonTypeclasses}>
                        <span>The response JSON's type should be: </span>
                        <span className="select-dis-value" onClick={(e)=>{this.toggleJSONTypeList(e)}}>
                            <span className="dis-name">{this.props.builders.resJSONType}</span>
                            <span className="glyphicon glyphicon-chevron-down"></span>
                        </span>
                        <DropDownMenu menus={this.props.jsonTypes} onClickItem={(v)=>{this.onSelectJSONTypeValue(v)}}/>
                    </span>
                    {checkResult}
                    {mainCon}
                </div>
            </div>
        )
    }

    toggleResCheckerKV(rowIndex) {
        ResCheckerAction.toggleResCheckerKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addResCheckerKV(rowIndex, kv) {
        if (kv.duplicatable !== false) {
            ResCheckerAction.addResCheckerKV(rowIndex, kv)
        }
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

    changeResCheckerKVChildValueType(rowIndex, value) {
        ResCheckerAction.changeResCheckerKVChildValueType(rowIndex, value)
    }

    toggleJSONTypeList(evt) {
        evt.stopPropagation()
        if (!evt.currentTarget.parentNode.classList.contains('disabled')) {
            ResCheckerAction.toggleJSONTypeList()
        }
    }

    onSelectJSONTypeValue(jsonType) {
        ResCheckerAction.changeJSONTypeValue(jsonType)
        ReqTabAction.setDirtyTab()
    }

}


export default ResChecker