//author @huntbao
'use strict'
import './reqbuilderheader.styl'
import React from 'react'
import classNames from 'classnames'

let ReqBuilderHeader = React.createClass({

    render() {
        let className = classNames({
            hide: this.props.tabCon.activeBuilderIndex !== 0
        })
        return (
            <div className={className}>
                <div className="mod-reqbuilder-header">reqbuilder-header</div>
            </div>
        )
    }

})


export default ReqBuilderHeader