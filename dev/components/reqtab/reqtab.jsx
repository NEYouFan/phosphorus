//author @huntbao
'use strict'
import './reqtab.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabStore from '../../stores/reqtabstore'

/** @namespace this.props.tabs */
let ReqTab = React.createClass({

    getInitialState() {
        return {
            activeIndex: ReqTabStore.getActiveTabIndex()
        }
    },

    render() {
        let removeBtnClasses = classNames({
            'glyphicon glyphicon-remove reqtab-remove': true,
            hide: this.props.tabs.length === 1
        })
        let tabNodes = this.props.tabs.map((tab, index) => {
            let tabClasses = classNames({
                reqtab: true,
                active: this.state.activeIndex === index
            })
            return (
                <div className={tabClasses} key={index} title={tab.name}>
                    <div className="reqtab-box"></div>
                    <span className="reqtab-name" onClick={this.click.bind(this, index)}>{tab.name}</span>
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
        this.switchTab(this.props.tabs.length - 1)
    },

    switchTab(activeIndex) {
        this.setState({
            activeIndex: activeIndex
        })
        ReqTabActions.switchTab(activeIndex)
    },

    remove(tabIndex, evt) {
        ReqTabActions.removeTab(tabIndex)
        let isActive = evt.target.parentNode.classList.contains('active')
        this.switchTab(isActive ? Math.max(0, tabIndex - 1) : this.state.activeIndex - 1)
    }

})


export default ReqTab