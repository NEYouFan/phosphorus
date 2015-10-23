//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import PanelStore from '../../stores/panelstore'
import Search from '../search/search.jsx'
import SideTab from '../sidetab/sidetab.jsx'
import History from '../history/history.jsx'
import Collections from '../collections/collections.jsx'
import ReqTab from '../reqtab/reqtab.jsx'

function getAppStates() {
    return Object.assign({}, PanelStore.getState())
}

let Index = React.createClass({

    getInitialState: function () {
        return getAppStates()
    },

    componentDidMount() {
        PanelStore.addChangeListener(this.onChange)
    },

    componentWillUnmount() {
        PanelStore.removeChangeListener(this.onChange)
    },

    render() {
        return (
            <div className="main-wrap">
                <div id="side" className="side">
                    <Search />
                    <SideTab />
                    <History active={this.state.history} />
                    <Collections active={!this.state.history} />
                </div>
                <div id="body" className="body">
                    <ReqTab tabs={this.state.reqTabs} />
                </div>
            </div>
        )
    },

    onChange() {
        this.setState(getAppStates())
    }

})


export default Index
