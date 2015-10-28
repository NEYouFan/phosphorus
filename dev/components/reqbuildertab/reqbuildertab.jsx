//author @huntbao
'use strict'
import './reqbuildertab.styl'
import React from 'react'
import ReqTabConAction from '../../actions/reqtabconaction'
import classNames from 'classnames'

let ReqBuilderTab = React.createClass({

    render() {
        let activeIndex = this.props.builders.activeIndex
        let nodes = this.props.builders.items.map((builder, index) => {
            let classes = classNames({
                active: index === activeIndex,
                disabled: builder.disabled
            })
            return (
                <li
                    className={classes}
                    onClick={this.clickHandler.bind(this, index)}
                    key={index}>{builder.name}
                </li>
            )
        })
        return (
            <div className="mod-reqbuilder-tab">
                <ol className="clr">
                    {nodes}
                </ol>
            </div>
        )
    },

    clickHandler(index, evt) {
        let target = evt.target
        if (target.classList.contains('active')) return
        if (target.classList.contains('disabled')) return
        ReqTabConAction.switchBuilderTab(this.props.tabIndex, index)
    }

})

export default ReqBuilderTab