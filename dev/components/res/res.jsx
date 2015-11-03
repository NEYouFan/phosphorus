//author @huntbao
'use strict'
import './res.styl'
import React from 'react'
import classNames from 'classnames'
import ResAction from '../../actions/resaction'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import FS from '../../libs/fs'

class Res extends React.Component {

    render() {
        let className = classNames({
            hide: this.props.builders.activeTabName !== 'Response'
        })
        return (
            <div className={className}>
                <div className="mod-res">
                    {this.getTip()}
                    {this.getCon()}
                </div>
            </div>
        )
    }

    getTip() {
        switch (this.props.builders.reqStatus) {
            // prepare
            case 0:
                return this.getPrepareTip()
            // sending...
            case 1:
                return this.getSendingTip()
            // sending succeeded
            case 2:
                return this.getSuccessTip()
            // sending failed
            case 3:
                return this.getFailedTip()
            default:
                break
        }
    }

    getPrepareTip() {
        return (
            <div className="res-tip">
                <em className="glyphicon glyphicon-info-sign"></em>
                <span>While you feel ready, click Send button to get the result.</span>
            </div>
        )
    }

    getSendingTip() {
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

    getSuccessTip() {
        let response = this.props.builders.fetchResponse
        let showType = this.props.builders.resShowType
        let isPrettyActive = showType.type === 'Pretty' ? 'active' : ''
        let isRawActive = showType.type === 'Raw' ? 'active' : ''
        let isPreviewActive = showType.type === 'Preview' ? 'active' : ''
        let tipClasses = classNames({
            'res-tip': true,
            'success-tip': true,
            'pretty-list': isPrettyActive
        })
        return (
            <div className={tipClasses}>
                <span className="status">
                    <span className="status-label">Status:</span>
                    <span className="status-code">{response.status}</span>
                    <span className="status-text">{response.statusText}</span>
                </span>
                <span className="time">
                    <span className="time-label">Time:</span>
                    <span className="time-text">{response.time}ms</span>
                </span>
                <ol className="res-types" onClick={(e)=>{this.changeShowType(e)}}>
                    <li className={isPrettyActive}>Pretty</li>
                    <li className={isRawActive}>Raw</li>
                    <li className={isPreviewActive}>Preview</li>
                </ol>
                {this.getPrettyTypeNodes(showType)}
            </div>
        )
    }

    getPrettyTypeNodes(showType) {
        let prettyTypeClasses = classNames({
            'res-prettytype-list': true,
            'show-type-list': this.props.showPrettyTypeList
        })
        return (
            <span className={prettyTypeClasses}>
                <span className="prettytype-wrap" onClick={(e)=>{this.togglePrettyTypeList(e)}}>
                    <span className="prettytype-name">{showType.prettyType}</span>
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

    changeShowType(evt) {
        let target = evt.target
        if (target.classList.contains('active')) return
        ResAction.changeResShowType(target.textContent)
    }

    getFailedTip() {
        return (
            <div className="res-tip failed-tip">
                <em className="glyphicon glyphicon-exclamation-sign"></em>
                <span>{this.props.builders.fetchResponseRawData.toString()}</span>
            </div>
        )
    }

    getCon() {
        // success content
        if (this.props.builders.reqStatus === 2) {
            switch (this.props.builders.resShowType.type) {
                case 'Raw':
                    return this.getRawCon()
                case 'Preview':
                    return this.getPreviewCon()
                default:
                    break;
            }
        }
    }

    getRawCon() {
        return (
            <div className="raw-con">
                <textarea readOnly={true} value={this.props.builders.fetchResponseRawData}></textarea>
            </div>
        )
    }

    getPreviewCon() {
        let builders = this.props.builders
        if (builders.resFilePath) {
            return (
                <div className="preview-con">
                    <iframe src={builders.resFilePath} frameBorder="0"></iframe>
                </div>
            )
        } else {
            FS.write('response.html', builders.fetchResponseRawData, 'html', (filePath) => {
                builders.resFilePath = filePath
                ResAction.emitChange()
            })
        }

    }

}


export default Res