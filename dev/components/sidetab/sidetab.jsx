//author @huntbao
'use strict'
import './sidetab.styl'
import React from 'react'

let SideTab = React.createClass({

    getInitialState() {
        return {history: true}
    },

    render() {
        return (
            <ol className="clr" onClick={this.handleClick}>
                <li className={this.state.history ? 'active' : ''}>History</li>
                <li className={this.state.history ? '' : 'active'}>Collections</li>
            </ol>
        )
    },

    handleClick (e) {
        if (e.target.classList.contains('active')) return
        this.setState({history: !this.state.history})
    }

})


export default SideTab