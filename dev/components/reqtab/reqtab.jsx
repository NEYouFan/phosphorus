//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'
import classNames from 'classnames'
import Util from '../../libs/util'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import ModalAction from '../../actions/modalaction'
import ReqTabStore from '../../stores/reqtabstore'

class ReqTab extends React.Component {

    render() {
        let tabNum = this.props.tabs.length
        let tabNodes = this.props.tabs.map((tab, index) => {
            let tabClasses = classNames({
                reqtab: true,
                active: this.props.activeIndex === index
            })
            let removeBtnClasses = classNames({
                'reqtab-remove': true,
                'dirty': tab.isDirty,
                'hide': !tab.isDirty && tabNum === 1 && !tab.id
            })
            return (
                <div className={tabClasses} key={index} title={tab.name}>
                    <div className="reqtab-box"></div>
                    <span className="reqtab-name" onMouseUp={(e)=>{this.mouseUp(e,index)}}>
                        <em>{tab.name || tab.url || 'New tab'}</em>
                    </span>
                    <div className={removeBtnClasses} onMouseUp={(e)=>{this.remove(e,index)}} title="Close tab">
                        <em className="glyphicon glyphicon-remove"></em>
                        <em className="dirty-dot"></em>
                    </div>
                </div>
            )
        })
        let addButton = <div className="glyphicon glyphicon-plus-sign reqtab-add" onClick={()=>{this.add()}}></div>
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
        ReqTabAction.addTab()
        ReqTabConAction.addCon()
        this.switchTab(this.props.tabs.length - 1)
    }

    remove(evt, tabIndex) {
        let tabDiv = evt.currentTarget.parentNode
        this.removeTab(tabDiv, tabIndex)
    }

    removeTab(tabDiv, tabIndex) {
        let isActive = tabDiv.classList.contains('active')
        let nextActiveIndex = Util.getNextActiveIndex(isActive, tabIndex, this.props.activeIndex)
        // check if dirty
        if (this.props.tabs[tabIndex].isDirty) {
            return ModalAction.openClosingDirtyTab({
                tabIndex: tabIndex,
                addNewTab: this.props.tabs.length === 1,
                nextActiveIndex: nextActiveIndex
            })
        }
        ReqTabConAction.removeCon(tabIndex)
        ReqTabAction.removeTab(tabIndex)
        if (this.props.tabs.length === 0) {
            // there is no tab left, add a tab
            return this.add()
        }
        this.switchTab(nextActiveIndex)
    }

    switchTab(activeIndex) {
        ReqTabAction.switchTab(activeIndex)
    }

}


export default ReqTab