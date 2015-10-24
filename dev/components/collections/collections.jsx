//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'

let Collections = React.createClass({

    render: function () {
        let active = !this.props.panel.history
        return (
            <div className={active ? '' : 'hide'}>
                <div className="mod-collections">collections</div>
            </div>
        )
    }

})

export default Collections