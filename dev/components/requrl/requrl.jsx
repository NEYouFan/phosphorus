//author @huntbao
'use strict'

import './requrl.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

/** @namespace this.props.showMethodList */
let ReqURL = React.createClass({

    render() {
        let reqWrapClasses = classNames({
            'requrl-wrap': true,
            'requrl-show-method': this.props.showMethodList
        })
        return (
            <div className="mod-requrl">
                <div className={reqWrapClasses}>
                    <div className="requrl-method" onClick={this.toggleMethodList}>
                        <span className="requrl-method-name">{this.props.tab.method}</span>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <DropDownMenu menus={this.props.reqMethods} onClickItem={this.onSelectMethod}/>

                    <div className="requrl-sep"></div>
                    <div className="requrl-url">
                        <input onChange={this.onChange}
                               value={this.props.tab.url}
                               type="url"
                               placeholder="Enter request URL here"/>
                    </div>
                    <div className="requrl-sep"></div>
                    <div className="requrl-params active" onClick={this.toggleParams}>Params</div>
                </div>
                <button className="requrl-send">Send</button>
                <button className="requrl-save">Save</button>
            </div>
        )
    },

    toggleMethodList(evt) {
        evt.stopPropagation()
        ReqTabConAction.toggleMethodList(this.props.tabIndex)
    },

    toggleParams(evt) {
        evt.stopPropagation()
        evt.target.classList.toggle('active')
        ReqTabConAction.toggleParams(this.props.tabIndex)
    },

    onChange(evt) {
        let url = evt.target.value
        let tab = this.props.tab
        tab.name = url
        tab.url = url
        ReqTabAction.changeTab(this.props.tabIndex, tab)
        ReqTabConAction.fillParams(this.props.tabIndex)
    },

    onSelectMethod(methodName) {
        let tab = this.props.tab
        tab.method = methodName
        ReqTabAction.changeTab(this.props.tabIndex, tab)
        ReqTabConAction.changeMethod(this.props.tabIndex)
    }

})


export default ReqURL