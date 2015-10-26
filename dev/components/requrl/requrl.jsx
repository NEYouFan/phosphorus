//author @huntbao
'use strict'

import './requrl.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabConAction from '../../actions/reqtabconaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

let ReqURL = React.createClass({

    getInitialState: function () {
        return {
            method: 'GET',
            url: ''
        }
    },

    render() {
        let reqWrapClasses = classNames({
            'requrl-wrap': true,
            'requrl-show-method': this.props.tabCons.showReqMethodsDropdown
        })
        return (
            <div className="mod-requrl">
                <div className={reqWrapClasses}>
                    <div className="requrl-method" onClick={this.toggleMethodMenu}>
                        <span className="requrl-method-name">{this.state.method}</span>
                        <span className="glyphicon glyphicon-chevron-down"></span>
                    </div>
                    <DropDownMenu menus={this.props.tabCons.reqMethods} onClickItem={this.onSelectMethod}/>

                    <div className="requrl-sep"></div>
                    <div className="requrl-url">
                        <input onInput={this.onInput}
                               value={this.state.url}
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
        this.setState({
            url: url
        })
        ReqTabConAction.changeTabName(url, this.props.index)
    },

    onSelectMethod(methodName) {
        this.setState({
            method: methodName
        })
    }

})


export default ReqURL