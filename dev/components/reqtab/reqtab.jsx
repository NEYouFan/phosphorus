//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabConActions from '../../actions/reqtabconaction'
import ReqTabStore from '../../stores/reqtabstore'

/** @namespace this.props.tabs */
class ReqTab extends React.Component {

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
                    <span className="reqtab-name" onMouseUp={(e)=>{this.mouseUp(e,index)}}>
                        <em>{tab.name}</em>
                    </span>
                    <span className={removeBtnClasses} onMouseUp={(e)=>{this.remove(e,index)}}></span>
                </div>
            )
        })
        let addButton = <a className="icono-plusCircle reqtab-add" onClick={()=>{this.add()}}></a>
        return (
            <div className="clr mod-reqtabs">
                {tabNodes}
                {addButton}
            </div>
        )
    }

    mouseUp(evt, tabIndex) {
        let tab = evt.currentTarget.parentNode
        if (evt.button === 1) {
            if (this.props.tabs.length > 1) {
                evt.stopPropagation()
                this.removeTab(tab, tabIndex)
            }
        } else {
            if (tab.classList.contains('active')) return
            this.switchTab(tabIndex)
        }
    }

    add() {
        ReqTabActions.addTab()
        ReqTabConActions.addCon()
        this.switchTab(this.props.tabs.length - 1)
    }

    remove(evt, tabIndex) {
        let tab = evt.currentTarget.parentNode
        this.removeTab(tab, tabIndex)
    }

    removeTab(tab, tabIndex) {
        ReqTabConActions.removeCon(tabIndex)
        ReqTabActions.removeTab(tabIndex)
        let isActive = tab.classList.contains('active')
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

    switchTab(activeIndex) {
        ReqTabActions.switchTab(activeIndex)
    }

}


export default ReqTab