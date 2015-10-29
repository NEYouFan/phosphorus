//author @huntbao
'use strict'
import './reqbuildertab.styl'
import React from 'react'
import ReqTabConAction from '../../actions/reqtabconaction'
import classNames from 'classnames'
import _ from 'lodash'

class ReqBuilderTab extends React.Component{

    render() {
        let activeTabName = this.props.builders.activeTabName
        let nodes = this.props.builders.items.map((builder, index) => {
            let classes = classNames({
                active: builder.name === activeTabName,
                disabled: builder.disabled
            })
            let builderName = builder.name
            if (builderName.toLowerCase() === 'request headers') {
                builderName += '(' + this.getValidHeadersNum() + ')'
            }
            return (
                <li
                    className={classes}
                    onClick={(e)=>{this.clickHandler(builder.name, e)}}
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
    }

    clickHandler(builderName, evt) {
        let target = evt.target
        if (target.classList.contains('active')) return
        if (target.classList.contains('disabled')) return
        ReqTabConAction.switchBuilderTab(this.props.tabIndex, builderName)
    }

    getValidHeadersNum() {
        let results = _.filter(this.props.builders.headerKVs, (kv) => {
            return kv.key
        })
        return results.length
    }

}

export default ReqBuilderTab