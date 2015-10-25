//author @huntbao
'use strict'
import './history.styl'
import React from 'react'
import classNames from 'classnames'

let History = React.createClass({

    render() {
        let className = classNames({
            hide: this.props.sideTab.activeIndex !== 0
        })
        return (
            <div className={className}>
                <div className="mod-history">history</div>
            </div>
        )
    }

})


export default History