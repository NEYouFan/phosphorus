//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'
import classNames from 'classnames'

let Collections = React.createClass({

    render: function () {
        let className = classNames({
            hide: this.props.sideTab.activeIndex !== 1
        })
        return (
            <div className={className}>
                <div className="mod-collections">collections</div>
            </div>
        )
    }

})

export default Collections