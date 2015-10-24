//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import PanelStore from '../../stores/panelstore'
import ReqTabStore from '../../stores/reqtabstore'
import Search from '../search/search.jsx'
import SideTab from '../sidetab/sidetab.jsx'
import History from '../history/history.jsx'
import Collections from '../collections/collections.jsx'
import ReqTab from '../reqtab/reqtab.jsx'

function getAppStates() {
    return Object.assign({}, PanelStore.getState(), ReqTabStore.getState())
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
                <div className="side">
                    <Search />
                    <SideTab />
                    <History panel={this.state.panel} />
                    <Collections panel={this.state.panel} />
                </div>
                <div className="bd">
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
