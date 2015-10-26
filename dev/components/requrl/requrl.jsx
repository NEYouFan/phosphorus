//author @huntbao
'use strict'

import './requrl.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqTabAction from '../../actions/reqtabaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

let ReqURL = React.createClass({

    render() {
        let reqWrapClasses = classNames({
            'requrl-wrap': true,
            'requrl-show-method': this.props.tabCons.showReqMethodsDropdown
        })
        return (
            <div className="mod-requrl">
                <div className={reqWrapClasses}>
                    <div className="requrl-method" onClick={this.toggleMethodMenu}>
                        <span className="requrl-method-name">{this.props.tab.method}</span>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <DropDownMenu menus={this.props.tabCons.reqMethods} onClickItem={this.onSelectMethod}/>

                    <div className="requrl-sep"></div>
                    <div className="requrl-url">
                        <input onInput={this.onInput}
                               value={this.props.tab.url}
                               type="url"
                               placeholder="Enter request URL here"/>
                    </div>
                    <div className="requrl-sep"></div>
                    <div className="requrl-params">Params</div>
                </div>
                <button className="requrl-send">Send</button>
                <button className="requrl-save">Save</button>
            </div>
        )
    },

    toggleMethodMenu(evt) {
        evt.stopPropagation()
        if (this.props.tabCons.showReqMethodsDropdown) {
            ReqTabConAction.hideMethodsDropDown()
        } else {
            ReqTabConAction.showMethodsDropDown()
        }
    },

    onInput(evt) {
        let url = evt.target.value
        let tab = this.props.tab
        tab.name = url
        tab.url = url
        ReqTabAction.changeTab(tab, this.props.index)
        ReqTabAction.fillParams(this.props.index)
    },

    onSelectMethod(methodName) {
        let tab = this.props.tab
        tab.method = methodName
        ReqTabAction.changeTab(tab, this.props.index)
    }

})


export default ReqURL