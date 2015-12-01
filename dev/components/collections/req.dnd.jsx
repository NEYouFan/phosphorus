//author @huntbao
'use strict'
import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import classNames from 'classnames'
import {DragSource, DropTarget} from 'react-dnd'
import ModalAction from '../../actions/modalaction'
import SideTabAction from '../../actions/sidtabaction'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'

const reqSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        }
    }
}

const reqTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

        // Determine mouse position
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    }
}

//@DropTarget('REQ', reqTarget, connect => ({
//    connectDropTarget: connect.dropTarget()
//}))
//
//@DragSource('REQ', reqSource, (connect, monitor) => ({
//    connectDragSource: connect.dragSource(),
//    isDragging: monitor.isDragging()
//}))

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class Req extends Component {


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
        const { req, activeReqId, reqActionMenus,index, collection, isDragging, connectDragSource, connectDropTarget } = this.props
        const opacity = isDragging ? 0 : 1

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
        return connectDragSource(connectDropTarget(
            <div
                key={index}
                onMouseLeave={(e)=>{this.onMouseLeaveReq(e)}}
                className={classes}
                onClick={(e)=>{this.onClickURL(req.id,collection,e)}}
                >
                {this.getRequestingStatus(req)}
                <div className={methodClasses}>{this.getMethodUIName(req.method)}</div>
                <div className="coll-req-url" title={reqURL}>{displayName}</div>
                {reqActions}
            </div>
        ))
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
}

Req.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveReq: PropTypes.func.isRequired
}

export default DropTarget('REQ', reqTarget, collect)(Req)
export default DragSource('REQ', reqSource, collect)(Req)