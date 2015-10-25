//author @huntbao
'use strict'
import './sidetab.styl'
import React from 'react'
import AppActions from '../../actions/action'
import PanelStore from '../../stores/panelstore'
import classNames from 'classnames'

let SideTab = React.createClass({

    getInitialState() {
        return {
            history: PanelStore.getState().panel.history
        }
    },

    render() {
        let historyClass = classNames({
            active: this.state.history
        })
        let collectionsClass = classNames({
            active: !this.state.history
        })
        return (
            <div className="mod-tab">
                <ol className="clr" onClick={this.clickHandler}>
                    <li className={historyClass}>History</li>
                    <li className={collectionsClass}>Collections</li>
                </ol>
            </div>
        )
    },

    clickHandler (e) {
        if (e.target.classList.contains('active')) return
        this.setState({history: !this.state.history})
        AppActions.switchPanel(!this.state.history)
    }

})


export default SideTab