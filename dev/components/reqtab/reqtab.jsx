//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabConActions from '../../actions/reqtabconaction'
import ReqTabStore from '../../stores/reqtabstore'

/** @namespace this.props.tabs */
let ReqTab = React.createClass({

    render() {
        let removeBtnClasses = classNames({
            'glyphicon glyphicon-remove reqtab-remove': true,
            'hide': this.props.tabs.length === 1
        })
        let tabNodes = this.props.tabs.map((tab, index) => {
            let tabClasses = classNames({
                reqtab: true,
                active: this.props.activeIndex === index
            })
            return (
                <div className={tabClasses} key={index} title={tab.name}>
                    <div className="reqtab-box"></div>
                    <span className="reqtab-name" onClick={this.click.bind(this, index)}>
                        <em>{tab.name}</em>
                    </span>
                    <span className={removeBtnClasses} onClick={this.remove.bind(this, index)}></span>
                </div>
            )
        })
        let addButton = <div className="glyphicon glyphicon-plus-sign reqtab-add" onClick={this.add}></div>
        return (
            <div className="clr mod-reqtabs">
                {tabNodes}
                {addButton}
            </div>
        )
    },

    click(tabIndex, evt) {
        let tab = evt.target.parentNode
        if (tab.classList.contains('active')) return
        this.switchTab(tabIndex)
    },

    add() {
        ReqTabActions.addTab()
        ReqTabConActions.addCon()
        this.switchTab(this.props.tabs.length - 1)
    },

    switchTab(activeIndex) {
        ReqTabActions.switchTab(activeIndex)
    },

    remove(tabIndex, evt) {
        ReqTabActions.removeTab(tabIndex)
        ReqTabConActions.removeCon(tabIndex)
        let isActive = evt.target.parentNode.classList.contains('active')
        let currentActiveIndex = this.props.activeIndex
        let nextActiveIndex
        if (isActive) {
            nextActiveIndex = Math.max(0, tabIndex - 1)
        } else if (tabIndex > currentActiveIndex) {
            nextActiveIndex = currentActiveIndex
        } else {
            nextActiveIndex = currentActiveIndex - 1
        }
        this.switchTab(nextActiveIndex)
    }

})


export default ReqTab