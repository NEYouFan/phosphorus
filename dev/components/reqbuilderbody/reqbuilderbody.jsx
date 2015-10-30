//author @huntbao
'use strict'
import './reqbuilderbody.styl'
import React from 'react'
import classNames from 'classnames'
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
                    <span className="rawtype-name">{bodyType.value}</span>
                    <span className="glyphicon glyphicon-chevron-down"></span>
                </span>
                <DropDownMenu menus={this.props.rawTypes} onClickItem={(v)=>{this.onSelectRawTypeValue(v)}}/>
            </span>
        )
    }

    render() {
        let bodyType = this.props.builders.bodyType
        let typeNodes = this.props.bodyTypes.map((type, index) => {
            let isChecked = type === bodyType.name
            let rawNodes = this.getRawNodes(type, isChecked, bodyType)
            return (
                <li key={index}>
                    <label>
                        <input type="radio" value={type} name="type" checked={isChecked}
                               onChange={(e)=>{this.onChange(e)}}/>
                        <span>{type}</span>
                    </label>
                    {rawNodes}
                </li>
            )
        })

        let modClassName = classNames({
            hide: this.props.builders.activeTabName !== 'Request Body'
        })

        let conNodes = this.getCon(bodyType.name)
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
            case 'raw':
                return this.getRawCon()
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
                editKV={() => {this.editBodyFormDataKV()}}
                changeKVKey={(rowIndex, value) => {this.changeBodyFormDataKVKey(rowIndex, value)}}
                changeKVValue={(rowIndex, value) => {this.changeBodyFormDataKVValue(rowIndex, value)}}
                changeKVValueType={(rowIndex, value) => {this.changeBodyFormDataKVValueType(rowIndex, value)}}
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
                editKV={() => {this.editBodyXFormKV()}}
                changeKVKey={(rowIndex, value) => {this.changeBodyXFormKVKey(rowIndex, value)}}
                changeKVValue={(rowIndex, value) => {this.changeBodyXFormKVValue(rowIndex, value)}}
                />
        )
    }

    getBinaryCon() {
        return (
            <input type="file" className="binary-file" name="binaryData" onChange={(e)=>{this.changeBinaryData(e)}}/>
        )
    }

    getRawCon() {

    }

    onChangeRawText(text) {
        console.log(text)
    }

    onChange(evt) {
        ReqBodyAction.changeBodyType(this.props.tabIndex, evt.target.value)
    }

    toggleRawTypeList(evt) {
        evt.stopPropagation()
        ReqBodyAction.toggleRawTypeList(this.props.tabIndex)
    }

    onSelectRawTypeValue(bodyType) {
        ReqBodyAction.changeBodyTypeValue(this.props.tabIndex, bodyType)
    }

    toggleBodyFormDataKV(rowIndex) {
        ReqBodyAction.toggleBodyFormDataKV(this.props.tabIndex, rowIndex)
    }

    addBodyFormDataKV() {
        ReqBodyAction.addBodyFormDataKV(this.props.tabIndex)
    }

    removeBodyFormDataKV(rowIndex) {
        ReqBodyAction.removeBodyFormDataKV(this.props.tabIndex, rowIndex)
    }

    editBodyFormDataKV() {
        ReqBodyAction.editBodyFormDataKV(this.props.tabIndex)
    }

    changeBodyFormDataKVKey(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVKey(this.props.tabIndex, rowIndex, value)
    }

    changeBodyFormDataKVValue(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVValue(this.props.tabIndex, rowIndex, value)
    }

    changeBodyFormDataKVValueType(rowIndex, value) {
        ReqBodyAction.changeBodyFormDataKVValueType(this.props.tabIndex, rowIndex, value)
    }

    toggleBodyXFormKV(rowIndex) {
        ReqBodyAction.toggleBodyXFormKV(this.props.tabIndex, rowIndex)
    }

    addBodyXFormKV() {
        ReqBodyAction.addBodyXFormKV(this.props.tabIndex)
    }

    removeBodyXFormKV(rowIndex) {
        ReqBodyAction.removeBodyXFormKV(this.props.tabIndex, rowIndex)
    }

    editBodyXFormKV() {
        ReqBodyAction.editBodyXFormKV(this.props.tabIndex)
    }

    changeBodyXFormKVKey(rowIndex, value) {
        ReqBodyAction.changeBodyXFormKVKey(this.props.tabIndex, rowIndex, value)
    }

    changeBodyXFormKVValue(rowIndex, value) {
        ReqBodyAction.changeBodyXFormKVValue(this.props.tabIndex, rowIndex, value)
    }

    changeBinaryData(evt) {
        // todo upload binary data
    }

}


export default ReqBuilderBody