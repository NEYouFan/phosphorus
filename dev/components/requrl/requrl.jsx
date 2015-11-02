//author @huntbao
'use strict'

import './requrl.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

/** @namespace this.props.showMethodList */
class ReqURL extends React.Component {

    render() {
        let reqWrapClasses = classNames({
            'requrl-wrap': true,
            'requrl-show-method': this.props.showMethodList
        })
        let inpClass = classNames({
            'inp-error': this.props.tab.urlError
        })
        return (
            <div className="mod-requrl">
                <div className={reqWrapClasses}>
                    <div className="requrl-method" onClick={(e)=>{this.toggleMethodList(e)}}>
                        <span className="requrl-method-name">{this.props.tab.method}</span>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <DropDownMenu menus={this.props.reqMethods} onClickItem={(n)=>{this.onSelectMethod(n)}}/>

                    <div className="requrl-sep"></div>
                    <div className="requrl-url">
                        <input
                            autoFocus="true"
                            className={inpClass}
                            onChange={(e)=>{this.onChange(e)}}
                            value={this.props.tab.url}
                            type="url"
                            spellCheck="false"
                            onKeyDown={(e)=>{this.onKeyDown(e)}}
                            placeholder="Enter request URL here"/>
                    </div>
                </div>
                <button className="requrl-send" onClick={()=>{this.sendReq()}}>Send</button>
                <button className="requrl-save">Save</button>
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
        tab.name = url
        tab.url = url
        tab.urlError = false
        ReqTabAction.changeTab(tab)
        ReqTabConAction.fillURLParams()
    }

    onSelectMethod(methodName) {
        let tab = this.props.tab
        tab.method = methodName
        ReqTabAction.changeTab(tab)
        ReqTabConAction.changeMethod()
    }

    sendReq() {
        ReqTabConAction.sendReq()
    }

    onKeyDown(evt) {
        if (evt.keyCode === 13) {
            this.sendReq()
        }
    }

}


export default ReqURL