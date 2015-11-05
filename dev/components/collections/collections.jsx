//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import ReqTabConAction from '../../actions/reqtabconaction'
import ModalAction from '../../actions/modalaction'

class Collections extends React.Component {

    render() {
        let getMethodUIName = (methodName) => {
            switch (methodName) {
                case 'DELETE':
                    return 'DEL'
                case 'OPTIONS':
                    return 'OPT'
                case 'PROPFIND':
                    return 'PROP'
                case 'UNLOCK':
                    return 'UNLCK'
                case 'UNLINK':
                    return 'UNLNK'
                default:
                    return methodName
            }
        }
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
                        return (
                            <div className="coll-req" key={index}>
                                <div className={methodClasses}>{getMethodUIName(request.method)}</div>
                                <div className="coll-req-url" title={request.url}>{request.url}</div>
                            </div>
                        )
                    })
                    return (
                        <div className="coll-folder" key={index}>
                            <div className="coll-folder-wrap" onClick={(e) => {this.toggleFolderSlide(e)}}>
                                <div className="coll-folder-icon">
                                    <span className="glyphicon glyphicon-folder-close"></span>
                                    <span className="glyphicon glyphicon-folder-open"></span>
                                </div>
                                <div className="coll-folder-name">{folder.name}</div>
                                <div className="coll-folder-actions">
                                    <div className="coll-folder-actions-menus" onClick={(e)=>{this.toggleFolderActionMenu(e)}}>
                                        <em className="glyphicon glyphicon-option-horizontal"></em>
                                    </div>
                                    <DropDownMenu
                                        menus={this.props.sideTab.actionMenus.folder}
                                        onClickItem={(e)=>{this.onClickFolderMenu(e)}}
                                        />
                                </div>
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
                                <div className="coll-actions-expand-detail" onClick={(e)=>{this.toggleCollActionDetail(e)}}>
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
                                onClickItem={(menuItem,e)=>{this.onClickCollectionMenuItem(menuItem,e)}}
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
    }

    toggleFolderSlide(evt) {
        let target = evt.currentTarget
        let nextSibling = target.nextSibling
        target.classList.toggle('expand')
        target.parentNode.parentNode.style.height = 'auto'
        nextSibling.classList.toggle('expand')
        let isExpanded = nextSibling.classList.contains('expand')
        nextSibling.style.height = (isExpanded ? (nextSibling.dataset.height) : 0) + 'px'
    }

    toggleCollDetail(evt) {
        // todo
        evt.stopPropagation()
    }

    toggleCollActionDetail(evt) {
        // todo
        evt.stopPropagation()
    }

    toggleCollActionMenu(evt) {
        // todo
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.toggle('show-action-menu')
    }

    onMouseLeaveColl(evt) {
        // todo
        evt.stopPropagation()
        evt.currentTarget.classList.remove('show-action-menu')
    }

    toggleFolderActionMenu(evt) {
        // todo
        evt.stopPropagation()
    }

    onClickFolderMenu(evt) {
        console.log(evt)
    }

    onClickCollectionMenuItem(menuItem, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
        switch (menuItem) {
            case 'Edit server url':
                return ModalAction.openEditCollServerURLModal()
            default:
                break
        }
    }

}

export default Collections