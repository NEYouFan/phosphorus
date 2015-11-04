//author @huntbao
'use strict'
import './history.styl'
import React from 'react'
import classNames from 'classnames'

class History extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.tabs.activeTabName !== 'History'
        })
        return (
            <div className={className}>
                <div className="mod-history">history</div>
            </div>
        )
    }

}


export default History