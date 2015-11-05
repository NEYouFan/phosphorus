//author @huntbao
'use strict'

import './dropdownmenu.styl'
import React from 'react'

let ReactPropTypes = React.PropTypes

class DropDownMenu extends React.Component {

    render() {
        let nodes = this.props.menus.map((menu, index) => {
            return (
                <li key={index} onClick={(e)=>{this.onClickItem(menu, e)}}>{menu.name || menu}</li>
            )
        })
        return (
            <ol className="mod-dropdown-menu">
                {nodes}
            </ol>
        )
    }

    onClickItem(menuItem, evt) {
        this.props.onClickItem(menuItem, evt)
    }

}

DropDownMenu.propTypes = {
    onClickItem: ReactPropTypes.func.isRequired
}


export default DropDownMenu