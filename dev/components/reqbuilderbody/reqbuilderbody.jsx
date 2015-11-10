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
import AceEditor from '../aceeditor/aceeditor.jsx'

class ReqBuilderBody extends React.Component {

    getRawNodes(type, isChecked, bodyType) {
        if (type !== 'raw') return
        let rawTypeClasses = classNames({
            'reqbuilder-body-rawtype': true,
            'show-raw-value': isChecked,
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
        let typeNodes = this.props.bodyTypes.map((item, index) => {
            let isChecked = item.type === bodyType.type
            let rawNodes = this.getRawNodes(item.type, isChecked, bodyType)
            let labelClasses = classNames({
                disabled: item.disabled
            })
            return (
                <li key={index}>
                    <label className={labelClasses}>
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

        let conNodes = this.getCon(bodyType.type)
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

    getCon(type) {
        switch (type) {
            case 'form-data':
                return this.getFormDataCon()
                break
            case 'x-www-form-urlencoded':
                return this.getXFormCon()
                break
            case 'binary':
                return this.getBinaryCon()
                break
            default:
                break
        }
    }

    getFormDataCon() {
        return (
            <KeyValueX
                kvs={this.props.builders.bodyFormDataKVs}
                toggleKV={(rowIndex) => {this.toggleBodyFormDataKV(rowIndex)}}
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
                toggleKV={(rowIndex) => {this.toggleBodyXFormKV(rowIndex)}}
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

    toggleBodyFormDataKV(rowIndex) {
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