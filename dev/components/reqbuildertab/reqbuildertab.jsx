//author @huntbao
'use strict'
import './reqbuildertab.styl'
import React from 'react'
import ReqTabConAction from '../../actions/reqtabconaction'
import classNames from 'classnames'

let ReqBuilderTab = React.createClass({

    render() {
        let headerClass = classNames({
            active: this.props.tabCon.activeBuilderIndex === 0
        })
        let bodyClass = classNames({
            active: this.props.tabCon.activeBuilderIndex === 1
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
        ReqTabConAction.switchBuilderTab(this.props.tabIndex, activeIndex)
    }

})


export default ReqBuilderTab