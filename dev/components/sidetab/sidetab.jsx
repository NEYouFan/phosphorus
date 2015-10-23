//author @huntbao
'use strict'
import './sidetab.styl'
import React from 'react'
import AppActions from '../../actions/action'
import AppStore from '../../stores/panelstore'

let SideTab = React.createClass({

    getInitialState() {
        return {
            history: AppStore.getState().history
        }
    },

    render() {
        return (
            <div className="mod-tab">
                <ol className="clr" onClick={this.handleClick}>
                    <li className={this.state.history ? 'active' : ''}>History</li>
                    <li className={this.state.history ? '' : 'active'}>Collections</li>
                </ol>
            </div>
        )
    },

    handleClick (e) {
        if (e.target.classList.contains('active')) return
        this.setState({history: !this.state.history})
        AppActions.switchPanel(!this.state.history)
    }

})


export default SideTab