//author @huntbao
'use strict'
import './res.styl'
import React from 'react'
import classNames from 'classnames'

class Res extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'Response'
        })
        return (
            <div className={className}>
                <div className="mod-res">
                    {this.getCon()}
                </div>
            </div>
        )
    }

    getCon() {
        switch (this.props.builders.reqStatus) {
            // prepare
            case 0:
                return this.getPrepareCon()
            // sending...
            case 1:
                return this.getSendingCon()
            // sending failed
            case 3:
                return this.getFailedCon()
            default:
                break
        }
    }

    getPrepareCon() {
        return (
            <div className="res-tip">
                <em className="glyphicon glyphicon-info-sign"></em>
                <span>While you feel ready, click Send button to get the result.</span>
            </div>
        )
    }

    getSendingCon() {
        return (
            <div className="res-tip">
                <div className="spinner">
                    <div className="dot1"></div>
                    <div className="dot2"></div>
                </div>
                <div className="loading-txt">Waiting for response...</div>
            </div>
        )
    }

    getFailedCon() {
        return (
            <div className="res-tip failed-tip">
                <em className="glyphicon glyphicon-exclamation-sign"></em>
                <span>{this.props.builders.fetchResponseData.toString()}</span>
            </div>
        )
    }

}


export default Res