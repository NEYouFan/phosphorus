//author @huntbao
'use strict'
import './reqbuildertab.styl'
import React from 'react'
import ReqTabConAction from '../../actions/reqtabconaction'
import classNames from 'classnames'
import _ from 'lodash'

let ReqBuilderTab = React.createClass({

    render() {
        let activeIndex = this.props.builders.activeIndex
        let nodes = this.props.builders.items.map((builder, index) => {
            let classes = classNames({
                active: index === activeIndex,
                disabled: builder.disabled
            })
            let builderName = builder.name
            if (builderName.toLowerCase() === 'headers') {
                builderName += '(' + this.getValidHeadersNum() + ')'
            }
            return (
                <li
                    className={classes}
                    onClick={this.clickHandler.bind(this, index)}
                    key={index}
                    >
                    {builderName}
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
    },

    getValidHeadersNum() {
        let results = _.filter(this.props.builders.headerKVs, (kv) => {
            return kv.key
        })
        return results.length
    }

})

export default ReqBuilderTab