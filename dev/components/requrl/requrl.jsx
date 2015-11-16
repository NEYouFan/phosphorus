//author @huntbao
'use strict'

import './requrl.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabAction from '../../actions/reqtabaction'
import ModalAction from '../../actions/modalaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

class ReqURL extends React.Component {

    render() {
        let reqWrapClasses = classNames({
            'requrl-wrap': true,
            'requrl-show-method': this.props.showMethodList
        })
        let inpClass = classNames({
            'inp-error': this.props.tab.urlError
        })
        let modClass = 'mod-requrl ' + (this.props.modClass || '')
        return (
            <div className={modClass}>
                <div className={reqWrapClasses}>
                    <div className="requrl-method" onClick={(e)=>{this.toggleMethodList(e)}}>
                        <span className="requrl-method-name">{this.props.tab.method}</span>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <DropDownMenu menus={this.props.reqMethods} onClickItem={(n)=>{this.onSelectMethod(n)}}/>

                    <div className="requrl-sep"></div>
                    <div className="requrl-url">
                        <input
                            readOnly={this.props.urlReadOnly}
                            autoFocus="true"
                            className={inpClass}
                            onChange={(e)=>{this.onChange(e)}}
                            value={this.props.tab.url}
                            type="url"
                            spellCheck="false"
                            onFocus={(e)=>{this.onFocus(e)}}
                            onBlur={(e)=>{this.onBlur(e)}}
                            onKeyDown={(e)=>{this.onKeyDown(e)}}
                            placeholder="Enter request URL here"/>
                    </div>
                </div>
                <button className="requrl-send" onClick={()=>{this.sendReq()}}>Send</button>
                <button className="requrl-save" onClick={()=>{this.saveReq()}} disabled={!this.props.tab.isDirty}>Save</button>
            </div>
        )
    }

    toggleMethodList(evt) {
        evt.stopPropagation()
        ReqTabConAction.toggleMethodList()
    }

    onChange(evt) {
        let url = evt.target.value
        let tab = this.props.tab
        tab.url = url
        tab.urlError = false
        ReqTabAction.changeTab(tab)
        ReqTabConAction.fillURLParams()
        ReqTabAction.setDirtyTab()
    }

    onSelectMethod(methodName) {
        let tab = this.props.tab
        tab.method = methodName
        ReqTabAction.changeTab(tab)
        ReqTabAction.setDirtyTab()
        ReqTabConAction.changeMethod()
    }

    onKeyDown(evt) {
        if (evt.keyCode === 13) {
            this.sendReq()
        }
    }

    onFocus(evt) {
        if (evt.target.dataset.isFocused === undefined || evt.target.dataset.isFocused === '0') {
            evt.target.select()
            evt.target.dataset.isFocused = '1'
        }
    }

    onBlur(evt) {
        evt.target.dataset.isFocused = '0'
    }

    sendReq() {
        ReqTabConAction.sendReq()
    }

    saveReq() {
        if(!this.props.tab.url.trim()) {
            return ModalAction.openSavingBlankURLTip()
        }
        if(!this.props.tab.id) {
            return ModalAction.openSavingNewURL(this.props.tab)
        }
        ReqTabAction.saveTab()
    }

}


export default ReqURL