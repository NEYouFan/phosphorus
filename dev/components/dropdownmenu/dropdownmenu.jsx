//author @huntbao
'use strict'

import './dropdownmenu.styl'
import React from 'react'

let ReactPropTypes = React.PropTypes

/** @namespace this.props.onClickItem */
/** @namespace this.props.menus */
class DropDownMenu extends React.Component{

    propTypes: {
        onClickItem: ReactPropTypes.func.isRequired
    }

    render() {
        let nodes = this.props.menus.map((menu, index) => {
            return (
                <li key={index} onClick={()=>{this.onClickItem(menu)}}>{menu.name||menu}</li>
            )
        })
        return (
            <ol className="mod-dropdown-menu">
                {nodes}
            </ol>
        )
    }

    onClickItem(menuItem) {
        this.props.onClickItem(menuItem)
    }

}


export default DropDownMenu