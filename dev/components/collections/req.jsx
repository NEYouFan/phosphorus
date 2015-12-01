//author @huntbao
'use strict'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import ModalAction from '../../actions/modalaction'
import SideTabAction from '../../actions/sidtabaction'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'

class Req extends React.Component {

    getMethodUIName(methodName) {
        let methodMap = {
            'DELETE': 'DEL',
            'OPTIONS': 'OPT',
            'PROPFIND': 'PROP',
            'UNLOCK': 'UNLCK',
            'UNLINK': 'UNLNK'
        }
        return methodMap[methodName] || methodName
    }

    render() {
        const {req, activeReqId, reqActionMenus, collection} = this.props
        let methodClasses = 'coll-req-method method-' + req.method.toLowerCase()
        let classes = classNames({
            'coll-req': true,
            'active': activeReqId === req.id
        })
        let reqURL = req.path
        let displayName = req.name || reqURL
        let reqActions
        if (!req.isNEI) {
            reqActions = (
                <div className="coll-req-actions-wrap">
                    <div className="coll-req-actions"
                         onClick={(e)=>{this.toggleReqActionMenu(e)}}>
                        <div className="coll-req-actions-menus">
                            <em className="glyphicon glyphicon-option-horizontal"></em>
                        </div>
                    </div>
                    <DropDownMenu
                        menus={reqActionMenus}
                        onClickItem={(menuItem,e)=>{this.onClickReqMenuItem(menuItem,collection,req,e)}}/>
                </div>
            )
        }
        return (
            <div
                //draggable={true}
                //onDragEnd={(e)=>{this.dragEnd(e)}}
                //onDragStart={(e)=>{this.dragStart(e)}}
                //onDragOver={(e)=>{this.dragOver(e)}}
                onMouseLeave={(e)=>{this.onMouseLeaveReq(e)}}
                className={classes}
                onClick={(e)=>{this.onClickURL(req.id,collection,e)}}
                >
                {this.getRequestingStatus(req)}
                <div className={methodClasses}>{this.getMethodUIName(req.method)}</div>
                <div className="coll-req-url" title={reqURL}>{displayName}</div>
                {reqActions}
            </div>
        )
    }

    toggleReqActionMenu(evt) {
        evt.stopPropagation()
        let target = evt.currentTarget
        target.parentNode.parentNode.classList.toggle('show-action-menu')
        target.nextSibling.style.top = (target.offsetTop + 26) + 'px'
    }

    onClickReqMenuItem(menuItem, collection, req, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.parentNode.classList.remove('show-action-menu')
        let data = Object.assign({
            collectionId: collection.id
        }, req)

        switch (menuItem) {

            case 'Edit':
                return ModalAction.openEditReqModal(data)

            case 'Move':
                return ModalAction.openMoveReqModal(data)

            case 'Delete':
                return ModalAction.openDeleteReqModal(data)

            default:
                break

        }
    }

    onMouseLeaveReq(evt) {
        evt.stopPropagation()
        evt.currentTarget.classList.remove('show-action-menu')
    }

    onClickURL(reqId, collection, evt) {
        let target = evt.currentTarget
        if (target.classList.contains('active')) return
        let request = _.find(collection.requests, (req) => {
            return req.id === reqId
        })
        // check if tab is dirty
        let activeReqTab = this.props.reqTabs[this.props.activeReqTabIndex]
        if (activeReqTab.isDirty) {
            return ModalAction.openLeavingDirtyTab({
                reqId: reqId,
                request: request,
                collection: collection
            })
        }
        SideTabAction.changeActiveReqId(reqId)
        ReqTabConAction.updateConByRequest(request, collection)
    }

    getRequestingStatus(req) {
        let cancelRequesting = (evt, req) => {
            evt.stopPropagation()
            delete req.reqStatus
            evt.currentTarget.classList.add('hide')
        }
        switch (req.reqStatus) {
            case 'waiting':
                return (
                    <div
                        className="coll-req-status coll-req-wait"
                        onClick={(e)=>{cancelRequesting(e,req)}}
                        title="Skip this request">
                        <em className="glyphicon glyphicon-minus-sign"></em>
                    </div>
                )
            case 'fetching':
                return (
                    <div className="coll-req-status coll-req-ani" title="Request is sending...">
                        <em className="glyphicon glyphicon-refresh"></em>
                    </div>
                )
            case 'succeed':
                return (
                    <div className="coll-req-status coll-req-succeed" title="Request succeed">
                        <em className="glyphicon glyphicon-ok"></em>
                    </div>
                )
            case 'failed':
                return (
                    <div className="coll-req-status coll-req-failed" title="There is something wrong">
                        <em className="glyphicon glyphicon-remove"></em>
                    </div>
                )
            default:
                return
        }
    }

    dragStart(evt) {
        // http://webcloud.se/sortable-list-component-react-js/
        this.dragged = evt.currentTarget
        this.dragged.style.opacity = 0
        evt.dataTransfer.effectAllowed = 'move'
        evt.dataTransfer.setData("text/html", evt.currentTarget)
    }

    dragEnd(evt) {
        this.dragged.style.opacity = 1
        this.dragged = null
    }

    dragOver(evt) {
        evt.preventDefault()
        let over = evt.currentTarget
        if(this.dragged === over) {
            return
        }
        console.log(this.dragged)
        evt.currentTarget.parentNode.insertBefore(this.dragged, over)
    }
}

export default Req
