//author @huntbao
'use strict'

import './dropdownmenu.styl'
import React from 'react'

let ReactPropTypes = React.PropTypes

/** @namespace this.props.onClickItem */
/** @namespace this.props.menus */
let DropDownMenu = React.createClass({

    propTypes: {
        onClickItem: ReactPropTypes.func.isRequired
    },

    render() {
        let nodes = this.props.menus.map((menu, index) => {
            return (
                <li key={index} onClick={this.onClickItem.bind(this, menu)}>{menu}</li>
            )
        })
        return (
            <ol className="mod-dropdown-menu">
                {nodes}
            </ol>
        )
    },

    onClickItem(menuItemName) {
        this.props.onClickItem(menuItemName)
    }

})


export default DropDownMenu