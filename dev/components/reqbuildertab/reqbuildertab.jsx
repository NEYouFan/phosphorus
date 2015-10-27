//author @huntbao
'use strict'
import './reqbuildertab.styl'
import React from 'react'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqTabConStore from '../../stores/reqtabconstore'
import classNames from 'classnames'

let ReqBuilderTab = React.createClass({

    getInitialState() {
        return {
            activeIndex: ReqTabConStore.getActiveBuilderIndex()
        }
    },

    render() {
        let headerClass = classNames({
            active: this.state.activeIndex === 0
        })
        let bodyClass = classNames({
            active: this.state.activeIndex === 1
        })
        return (
            <div className="mod-reqbuilder-tab">
                <ol className="clr" onClick={this.clickHandler}>
                    <li className={headerClass} data-index="0">Headers(0)</li>
                    <li className={bodyClass} data-index="1">Body</li>
                </ol>
            </div>
        )
    },

    clickHandler(evt) {
        let target = evt.target
        if (target.classList.contains('active')) return
        let activeIndex = Number(target.dataset.index)
        this.setState({
            activeIndex: activeIndex
        })
        ReqTabConAction.switchBuilderTab(activeIndex)
    }

})


export default ReqBuilderTab