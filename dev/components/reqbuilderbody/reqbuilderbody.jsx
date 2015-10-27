//author @huntbao
'use strict'
import './reqbuilderbody.styl'
import React from 'react'
import classNames from 'classnames'

let ReqBuilderBody = React.createClass({

    render() {
        let className = classNames({
            hide: this.props.tabCon.activeBuilderIndex !== 1
        })
        return (
            <div className={className}>
                <div className="mod-reqbuilder-body">reqbuilder-body</div>
            </div>
        )
    }

})


export default ReqBuilderBody