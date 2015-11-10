//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Util from '../../libs/util'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import SideTabAction from '../../actions/sidtabaction'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import ModalAction from '../../actions/modalaction'

class Collections extends React.Component {

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
        let className = classNames({
            hide: this.props.sideTab.tabs.activeTabName !== 'Collections'
        })
        let collections = this.props.sideTab.collections
        let collectionNodes
        if (collections) {
            collectionNodes = collections.map((collection, index) => {
                let foldersHeight = collection.folders.length * 40
                let folderNodes = collection.folders.map((folder, index) => {
                    let reqsHeight = folder.orders.length * 30
                    let requestNodes = folder.orders.map((reqId, index) => {
                        let request = _.find(collection.requests, (req) => {
                            return req.id === reqId
                        })
                        let methodClasses = 'coll-req-method method-' + request.method.toLowerCase()
                        let classes = classNames({
                            'coll-req': true,
                            'active': this.props.sideTab.tabs.activeReqId === reqId
                        })
                        let url = (folder.host || collection.host) + request.path
                        let displayName = request.name || url
                        return (
                            <div className={classes} key={index}
                                 onClick={(e)=>{this.onClickURL(url,reqId,collection,e)}}>
                                <div className={methodClasses}>{this.getMethodUIName(request.method)}</div>
                                <div className="coll-req-url" title={url}>{displayName}</div>
                            </div>
                        )
                    })
                    return (
                        <div className="coll-folder" key={index}>
                            <div className="coll-folder-wrap"
                                 onClick={(e) => {this.toggleFolderSlide(e)}}
                                 onMouseLeave={(e)=>{this.onMouseLeaveFolder(e)}}
                                >
                                <div className="coll-folder-icon">
                                    <span className="glyphicon glyphicon-folder-close"></span>
                                    <span className="glyphicon glyphicon-folder-open"></span>
                                </div>
                                <div className="coll-folder-name">{folder.name}</div>
                                <div className="coll-folder-actions">
                                    <div className="coll-folder-actions-menus"
                                         onClick={(e)=>{this.toggleFolderActionMenu(e)}}>
                                        <em className="glyphicon glyphicon-option-horizontal"></em>
                                    </div>
                                </div>
                                <DropDownMenu
                                    menus={this.props.sideTab.actionMenus.folder}
                                    onClickItem={(menuItem,e)=>{this.onClickFolderMenuItem(menuItem,collection,folder,e)}}
                                    />
                            </div>
                            <div className="coll-reqs" data-height={reqsHeight}>{requestNodes}</div>
                        </div>
                    )
                })
                return (
                    <div className="coll" key={index}>
                        <div className="coll-wrap"
                             onClick={(e) => {this.toggleCollSlide(e)}}
                             onMouseLeave={(e)=>{this.onMouseLeaveColl(e)}}
                            >
                            <div className="coll-icon">
                                <em className="glyphicon glyphicon-briefcase"></em>
                            </div>
                            <div className="coll-info">
                                <div className="coll-name">{collection.name}</div>
                                <div className="coll-reqnum">
                                    <div className="coll-dot"></div>
                                    <div className="coll-reqnum-text">{collection.requests.length} requests</div>
                                </div>
                            </div>
                            <div className="coll-actions">
                                <div className="coll-actions-expand-detail"
                                     onClick={(e)=>{this.toggleCollActionDetail(e)}}>
                                    <em className="glyphicon glyphicon-arrow-right"></em>
                                    <em className="glyphicon glyphicon-arrow-left"></em>
                                </div>
                                <div className="coll-actions-menus"
                                     onClick={(e)=>{this.toggleCollActionMenu(e)}}
                                    >
                                    <em className="glyphicon glyphicon-option-horizontal"></em>
                                </div>
                            </div>
                            <DropDownMenu
                                menus={this.props.sideTab.actionMenus.collection}
                                onClickItem={(menuItem,e)=>{this.onClickCollectionMenuItem(menuItem,collection,e)}}
                                />
                        </div>
                        <div className="coll-folders" data-height={foldersHeight}>{folderNodes}</div>
                    </div>
                )
            })
        } else {
            collectionNodes = (
                <div className="empty-tip">
                    You haven't created any collections yet. Collections let you group requests together for quick
                    access.
                </div>
            )
        }
        return (
            <div className={className}>
                <div className="mod-collections">{collectionNodes}</div>
            </div>
        )
    }

    toggleCollSlide(evt) {
        let target = evt.currentTarget
        let nextSibling = target.nextSibling
        target.classList.toggle('expand')
        nextSibling.classList.toggle('expand')
        let isExpanded = nextSibling.classList.contains('expand')
        if (isExpanded) {
            nextSibling.style.height = nextSibling.dataset.height + 'px'
        } else {
            let nodes = nextSibling.parentNode.querySelectorAll('.coll-folder-wrap, .coll-reqs')
            _.forEach(nodes, (node) => {
                node.classList.remove('expand')
                if (node.classList.contains('coll-reqs')) {
                    node.style.height = '0px'
                }
            })
            nextSibling.style.height = nextSibling.dataset.height + 'px'
            setTimeout(() => {
                nextSibling.style.height = '0px'
            }, 0)
        }
        // hide action menu
        target.classList.remove('show-action-menu')
    }

    toggleFolderSlide(evt) {
        let target = evt.currentTarget
        let nextSibling = target.nextSibling
        target.classList.toggle('expand')
        target.parentNode.parentNode.style.height = 'auto'
        nextSibling.classList.toggle('expand')
        let isExpanded = nextSibling.classList.contains('expand')
        nextSibling.style.height = (isExpanded ? (nextSibling.dataset.height) : 0) + 'px'
        // hide action menu
        target.classList.remove('show-action-menu')
    }

    toggleCollActionDetail(evt) {
        evt.stopPropagation()
        // hide action menu
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
    }

    toggleCollActionMenu(evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.toggle('show-action-menu')
    }

    onMouseLeaveColl(evt) {
        evt.stopPropagation()
        evt.currentTarget.classList.remove('show-action-menu')
    }

    toggleFolderActionMenu(evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.toggle('show-action-menu')
    }

    onClickCollectionMenuItem(menuItem, collection, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
        switch (menuItem) {
            case 'Edit host':
                return ModalAction.openEditCollHostModal(collection)
            default:
                break
        }
    }

    onClickFolderMenuItem(menuItem, collection, folder, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
        switch (menuItem) {
            case 'Edit host':
                return ModalAction.openEditFolderHostModal(Object.assign({
                    collectionId: collection.id
                }, folder))
            default:
                break
        }

    }

    onMouseLeaveFolder(evt) {
        evt.stopPropagation()
        evt.currentTarget.classList.remove('show-action-menu')
    }

    onClickURL(url, reqId, collection, evt) {
        if (evt.currentTarget.classList.contains('active')) return
        let request = _.find(collection.requests, (req) => {
            return req.id === reqId
        })
        // request is from NEI
        if (request.isNEI) {
            if (Util.isNoBodyMethod(request.method)) {
                let queryParams = request.inputs.map((urlParam, index) => {
                    return {
                        key: urlParam.name,
                        checked: true
                    }
                })
                url = Util.getURLByQueryParams(url, queryParams)
            }
        }
        let tab = {
            id: request.id,
            name: request.name || url,
            url: url,
            method: request.method,
            isNEI: request.isNEI,
            isDirty: false,
            urlError: false
        }
        // check if tab is dirty
        let activeReqTab = this.props.reqTabs[this.props.activeReqTabIndex]
        if (activeReqTab.isDirty) {
            return ModalAction.openLeavingDirtyTab({
                reqId: reqId,
                tab: tab,
                request: request,
                collection: collection
            })
        }
        SideTabAction.changeActiveReqId(reqId)
        ReqTabAction.changeTab(tab)
        ReqTabConAction.updateConByRequest(request, collection)
    }

}

export default Collections