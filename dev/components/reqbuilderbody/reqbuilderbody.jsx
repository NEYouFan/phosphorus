//author @huntbao
'use strict'
import './reqbuilderbody.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabAction from '../../actions/reqtabaction'
import ReqBodyAction from '../../actions/reqbodyaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import KeyValue from '../keyvalue/keyvalue.jsx'
import KeyValueX from '../keyvalue/keyvaluex.jsx'
import KeyValueVT from '../keyvalue/keyvaluevt.jsx'
import AceEditor from '../aceeditor/aceeditor.jsx'

class ReqBuilderBody extends React.Component {

    getRawNodes(type, isChecked, isDisabled, bodyType) {
        if (type !== 'raw') return
        let rawTypeClasses = classNames({
            'reqbuilder-body-rawtype': true,
            'show-raw-value': isChecked && !isDisabled,
            'show-raw-list': this.props.showRawTypeList
        })
        return (
            <span className={rawTypeClasses}>
                <span className="rawtype-wrap" onClick={(e)=>{this.toggleRawTypeList(e)}}>
                    <span className="rawtype-name">{bodyType.name}</span>
                    <span className="glyphicon glyphicon-chevron-down"></span>
                </span>
                <DropDownMenu menus={this.props.rawTypes} onClickItem={(v)=>{this.onSelectRawTypeValue(v)}}/>
            </span>
        )
    }

    render() {
        let bodyType = this.props.builders.bodyType
        let typeNodes = this.props.builders.bodyTypes.map((item, index) => {
            let isChecked = item.type === bodyType.type
            let rawNodes = this.getRawNodes(item.type, isChecked, item.disabled, bodyType)
            let liClasses = classNames({
                disabled: item.disabled,
                checked: isChecked
            })
            return (
                <li key={index} className={liClasses}>
                    <label>
                        <input
                            type="radio"
                            value={item.type}
                            name="type"
                            checked={isChecked}
                            disabled={item.disabled}
                            onChange={(e)=>{this.onChange(e)}}
                            />
                        <span>{item.type}</span>
                    </label>
                    {rawNodes}
                </li>
            )
        })

        let modClassName = classNames({
            hide: this.props.builders.activeTabName !== 'Request Body'
        })

        let conNodes = this.getCon(bodyType)
        return (
            <div className={modClassName}>
                <div className="mod-reqbuilder-body">
                    <form>
                        <ol className="type-tabs">{typeNodes}</ol>
                    </form>
                    {conNodes}
                </div>
            </div>
        )
    }

    getCon(bodyType) {
        switch (bodyType.type) {
            case 'raw':
                if (bodyType.value === 'application/json') {
                    return this.getRawJSONCon()
                }
                break
            case 'form-data':
                return this.getFormDataCon()

            case 'x-www-form-urlencoded':
                return this.getXFormCon()

            case 'binary':
                return this.getBinaryCon()

            default:
                break
        }
    }

    getRawJSONCon() {
        let kvvt
        if (this.props.builders.bodyRawJSONKVs.length === 0) {
            kvvt = (
                <div className="tip-con error-tip">
                    <em className="glyphicon glyphicon-exclamation-sign"></em>
                    <span>This request url has no input parameters.</span>
                </div>
            )
        } else if (this.props.builders.bodyRawJSONKVs === 'Circular Reference') {
            kvvt =
                <div className="tip-con error-tip">
                    <em className="glyphicon glyphicon-exclamation-sign"></em>
                    <span>Input parameters exists Circular Reference, please check it.</span>
                </div>
        } else {
            kvvt = (
                <KeyValueVT
                    kvs={this.props.builders.bodyRawJSONKVs}
                    toggleKV={(rowIndex,kv) => {this.toggleBodyRawJSONKV(rowIndex,kv)}}
                    addKV={(rowIndex) => {this.addBodyRawJSONKV(rowIndex)}}
                    removeKV={(rowIndex) => {this.removeBodyRawJSONKV(rowIndex)}}
                    changeKVKey={(rowIndex, value) => {this.changeBodyRawJSONKVKey(rowIndex, value)}}
                    changeKVValue={(rowIndex, value) => {this.changeBodyRawJSONKVValue(rowIndex, value)}}
                    changeKVValueType={(rowIndex, value) => {this.changeBodyRawJSONKVValueType(rowIndex, value)}}
                    />
            )
        }
        return kvvt
    }

    getFormDataCon() {
        return (
            <KeyValueX
                kvs={this.props.builders.bodyFormDataKVs}
                toggleKV={(rowIndex,kv) => {this.toggleBodyFormDataKV(rowIndex,kv)}}
                addKV={() => {this.addBodyFormDataKV()}}
                removeKV={(rowIndex) => {this.removeBodyFormDataKV(rowIndex)}}
                changeKVKey={(rowIndex, value) => {this.changeBodyFormDataKVKey(rowIndex, value)}}
                changeKVValue={(rowIndex, value) => {this.changeBodyFormDataKVValue(rowIndex, value)}}
                changeKVValueType={(rowIndex, value) => {this.changeBodyFormDataKVValueType(rowIndex, value)}}
                changeKVFileValue={(rowIndex, value) => {this.changeBodyFormDataKVFileValue(rowIndex, value)}}
                />
        )
    }

    getXFormCon() {
        return (
            <KeyValue
                showKV={true}
                kvs={this.props.builders.bodyXFormKVs}
                toggleKV={(rowIndex,kv) => {this.toggleBodyXFormKV(rowIndex,kv)}}
                addKV={() => {this.addBodyXFormKV()}}
                removeKV={(rowIndex) => {this.removeBodyXFormKV(rowIndex)}}
                changeKVKey={(rowIndex, value) => {this.changeBodyXFormKVKey(rowIndex, value)}}
                changeKVValue={(rowIndex, fileInput) => {this.changeBodyXFormKVValue(rowIndex, fileInput)}}
                />
        )
    }

    getBinaryCon() {
        return (
            <input type="file" className="binary-file" name="binaryData" onChange={(e)=>{this.changeBinaryData(e)}}/>
        )
    }

    onChange(evt) {
        ReqBodyAction.changeBodyType(evt.target.value)
        ReqTabAction.setDirtyTab()
    }

    toggleRawTypeList(evt) {
        evt.stopPropagation()
        if (evt.currentTarget.parentNode.classList.contains('show-raw-value')) {
            ReqBodyAction.toggleRawTypeList()
        }
    }

    onSelectRawTypeValue(bodyType) {
        ReqBodyAction.changeBodyTypeValue(bodyType)
        ReqTabAction.setDirtyTab()
    }

    toggleBodyRawJSONKV(rowIndex) {
        ReqBodyAction.toggleBodyRawJSONKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addBodyRawJSONKV(rowIndex) {
        ReqBodyAction.addBodyRawJSONKV(rowIndex)
    }

    removeBodyRawJSONKV(rowIndex) {
        ReqBodyAction.removeBodyRawJSONKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    changeBodyRawJSONKVKey(rowIndex, value) {
        ReqBodyAction.changeBodyRawJSONKVKey(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyRawJSONKVValue(rowIndex, value) {
        ReqBodyAction.changeBodyRawJSONKVValue(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyRawJSONKVValueType(rowIndex, value) {
        ReqBodyAction.changeBodyRawJSONKVValueType(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    toggleBodyFormDataKV(rowIndex, kv) {
        ReqBodyAction.toggleBodyFormDataKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addBodyFormDataKV() {
        ReqBodyAction.addBodyFormDataKV()
    }

    removeBodyFormDataKV(rowIndex) {
        ReqBodyAction.removeBodyFormDataKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    changeBodyFormDataKVKey(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVKey(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyFormDataKVValue(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVValue(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyFormDataKVValueType(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVValueType(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyFormDataKVFileValue(rowIndex, fileInput) {
        ReqBodyAction.changeBodyFormDataKVFileValue(rowIndex, fileInput)
    }

    toggleBodyXFormKV(rowIndex) {
        ReqBodyAction.toggleBodyXFormKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    addBodyXFormKV() {
        ReqBodyAction.addBodyXFormKV()
    }

    removeBodyXFormKV(rowIndex) {
        ReqBodyAction.removeBodyXFormKV(rowIndex)
        ReqTabAction.setDirtyTab()
    }

    changeBodyXFormKVKey(rowIndex, value) {
        ReqBodyAction.changeBodyXFormKVKey(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBodyXFormKVValue(rowIndex, value) {
        ReqBodyAction.changeBodyXFormKVValue(rowIndex, value)
        ReqTabAction.setDirtyTab()
    }

    changeBinaryData(evt) {
        ReqBodyAction.changeBodyBinaryFile(evt.target)
    }

}


export default ReqBuilderBody