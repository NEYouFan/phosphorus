//author @huntbao
'use strict'

import './dropdownmenu.styl'
import React from 'react'
import classNames from 'classnames'

/** @namespace this.props.onClickItem */
/** @namespace this.props.menus */
let DropDownMenu = React.createClass({

    render() {
        let nodes = this.props.menus.map((menu, index) => {
            let menuClasses = classNames({
                'menu-item': true
            })
            return (
                <li className={menuClasses} key={index} onClick={this.onClickItem.bind(this, menu)}>{menu}</li>
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