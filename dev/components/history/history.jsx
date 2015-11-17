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
                <div className="mod-history">
                    Nothing in your history yet. Requests that you send through Phosphorus are automatically saved here.
                </div>
            </div>
        )
    }

}


export default History