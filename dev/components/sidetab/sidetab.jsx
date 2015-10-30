//author @huntbao
'use strict'
import './sidetab.styl'
import React from 'react'
import SideTabAction from '../../actions/sidtabaction'
import SideTabStore from '../../stores/sidetabstore'
import classNames from 'classnames'

class SideTab extends React.Component {

    render() {
        let historyClass = classNames({
            active: this.props.sideTab.activeIndex === 0
        })
        let collectionsClass = classNames({
            active: this.props.sideTab.activeIndex === 1
        })
        return (
            <div className="mod-tab">
                <ol className="clr" onClick={this.clickHandler}>
                    <li className={historyClass} data-index="0">History</li>
                    <li className={collectionsClass} data-index="1">Collections</li>
                </ol>
            </div>
        )
    }

    clickHandler(e) {
        if (e.target.classList.contains('active')) return
        let activeIndex = Number(e.target.dataset.index)
        SideTabAction.switchTab(activeIndex)
    }

}


export default SideTab