//author @huntbao
'use strict'
import './history.styl'
import React from 'react'

let History = React.createClass({

    render() {
        let active = this.props.panel.history
        return (
            <div className={active ? '' : 'hide'}>
                <div className="mod-history">history</div>
            </div>
        )
    }

})


export default History