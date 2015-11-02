//author @huntbao
'use strict'
import './res.styl'
import React from 'react'
import classNames from 'classnames'
import ResAction from '../../actions/resaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'

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
            // sending succeeded
            case 2:
                return this.getSuccessCon()
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

    getSuccessCon() {
        let response = this.props.builders.fetchResponse
        let prettyType = this.props.builders.resPrettyType
        return (
            <div className="res-tip success-tip">
                <span className="status">
                    <span className="status-label">Status:</span>
                    <span className="status-code">{response.status}</span>
                    <span className="status-text">{response.statusText}</span>
                </span>
                <span className="time">
                    <span className="time-label">Time:</span>
                    <span className="time-text">{response.time}ms</span>
                </span>
                <ol className="res-types">
                    <li>Pretty</li>
                    <li>Raw</li>
                    <li>Preview</li>
                </ol>
                {this.getPrettyTypeNodes(prettyType)}
            </div>
        )
    }

    getPrettyTypeNodes(prettyType) {
        let prettyTypeClasses = classNames({
            'res-prettytype-list': true,
            'show-type-list': this.props.showPrettyTypeList
        })
        return (
            <span className={prettyTypeClasses}>
                <span className="prettytype-wrap" onClick={(e)=>{this.togglePrettyTypeList(e)}}>
                    <span className="prettytype-name">{prettyType}</span>
                    <span className="glyphicon glyphicon-chevron-down"></span>
                </span>
                <DropDownMenu menus={this.props.prettyTypes} onClickItem={(v)=>{this.onSelectPrettyTypeValue(v)}}/>
            </span>
        )
    }

    togglePrettyTypeList(evt) {
        evt.stopPropagation()
        ResAction.toggleResPrettyTypeList()
    }

    onSelectPrettyTypeValue(prettyType) {
        ResAction.changeResPrettyValue(prettyType)
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