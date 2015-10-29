//author @huntbao
'use strict'
import './reqbuilderbody.styl'
import React from 'react'
import classNames from 'classnames'
import ReqBodyAction from '../../actions/reqbodyaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import KeyValueX from '../keyvalue/keyvaluex.jsx'

class ReqBuilderBody extends React.Component{

    render() {
        let bodyType = this.props.builders.bodyType
        let typeNodes = this.props.bodyTypes.map((type, index) => {
            let isChecked = type === bodyType.name
            let rawTypeClasses = classNames({
                'reqbuilder-body-rawtype': true,
                'show-raw-value': isChecked,
                'show-raw-list': this.props.showRawTypeList
            })
            return (
                <li key={index}>
                    <label>
                        <input type="radio" value={type} name="type" checked={isChecked} onChange={this.onChange.bind(this)}/>
                        <span>{type}</span>
                    </label>
                    {type === 'raw' ?
                        <span className={rawTypeClasses}>
                            <span className="rawtype-wrap" onClick={this.toggleRawTypeList}>
                                <span className="rawtype-name">{bodyType.value}</span>
                                <span className="glyphicon glyphicon-chevron-down"></span>
                            </span>
                            <DropDownMenu
                                menus={this.props.rawTypes}
                                onClickItem={this.onSelectRawType}
                                />
                        </span>
                        : ''}
                </li>
            )
        })

        let modClassName = classNames({
            hide: this.props.builders.activeIndex !== 1
        })

        let isFormDataType = bodyType.name === 'form-data'

        return (
            <div className={modClassName}>
                <div className="mod-reqbuilder-body">
                    <form>
                        <ol className="type-tabs">{typeNodes}</ol>
                    </form>
                    {isFormDataType ?
                    <KeyValueX
                        showKV={true}
                        kvs={this.props.builders.bodyFormDataKVs}
                        toggleKV={(rowIndex) => {this.toggleBodyFormDataKV(rowIndex)}}
                        addKV={() => {this.addBodyFormDataKV()}}
                        removeKV={(rowIndex) => {this.removeBodyFormDataKV(rowIndex)}}
                        editKV={() => {this.editBodyFormDataKV()}}
                        changeKVKey={(rowIndex, value) => {this.changeBodyFormDataKVKey(rowIndex, value)}}
                        changeKVValue={(rowIndex, value) => {this.changeBodyFormDataKVValue(rowIndex, value)}}
                        changeKVValueType={(rowIndex, value) => {this.changeBodyFormDataKVValueType(rowIndex, value)}}
                        />
                        : ''}
                </div>
            </div>
        )
    }

    onChange(evt) {
        ReqBodyAction.changeBodyType(this.props.tabIndex, evt.target.value)
    }

    toggleRawTypeList(evt) {
        evt.stopPropagation()
        ReqBodyAction.toggleRawTypeList(this.props.tabIndex)
    }

    onSelectRawType(bodyTypeValue) {
        ReqBodyAction.changeBodyTypeValue(this.props.tabIndex, bodyTypeValue)
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

}


export default ReqBuilderBody