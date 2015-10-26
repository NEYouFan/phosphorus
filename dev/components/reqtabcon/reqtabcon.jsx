//author @huntbao
'use strict'
import './reqtabcon.styl'
import React from 'react'
import classNames from 'classnames'
import ReqTabActions from '../../actions/reqtabaction'
import ReqTabStore from '../../stores/reqtabstore'

let ReqTabCon = React.createClass({

    getInitialState() {
        return {
            activeIndex: ReqTabStore.getActiveTabIndex()
        }
    },

    render() {
        return (
            <div className="clr mod-reqtabcons">
            </div>
        )
    }

})


export default ReqTabCon