//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Util from '../../libs/util'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import Req from './req.jsx'
import SideTabAction from '../../actions/sidtabaction'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'
import ModalAction from '../../actions/modalaction'

class Collections extends React.Component {

    getReqNode(req, collection, index) {
        return (
            <Req
                req={req}
                reqTabs={this.props.reqTabs}
                activeReqTabIndex={this.props.activeReqTabIndex}
                collection={collection}
                index={index}
                activeReqId={this.props.sideTab.tabs.activeReqId}
                reqActionMenus={this.props.sideTab.actionMenus.request}
                />
        )
    }

    render() {
        let className = classNames({
            hide: this.props.sideTab.tabs.activeTabName !== 'Collections'
        })
        let collections = this.props.sideTab.collections
        let collectionNodes
        if (collections && collections.length) {
            collectionNodes = collections.map((collection, index) => {
                let collectionActionMenu = this.props.sideTab.actionMenus.collection
                let folderActionMenu = this.props.sideTab.actionMenus.folder
                if (collection.isNEI) {
                    collectionActionMenu = collectionActionMenu.concat()
                    collectionActionMenu.splice(1, 2)
                    folderActionMenu = [folderActionMenu[0]]
                } else {
                    collectionActionMenu = collectionActionMenu.concat()
                    collectionActionMenu.splice(3, 1)
                }
                let collClasses = classNames({
                    'coll': true,
                    'coll-nei': collection.isNEI
                })
                let foldersHeight = collection.folders.length * 40
                let folderNodes = collection.folders.map((folder, index) => {
                    let reqsHeight = folder.orders.length * 30
                    let requestNodes = folder.orders.map((reqId, index) => {
                        let request = _.find(collection.requests, (req) => {
                            return req.id === reqId
                        })
                        return this.getReqNode(request, collection, index)
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
                                <div className="coll-folder-actions"
                                     onClick={(e)=>{this.toggleFolderActionMenu(e)}}>
                                    <div className="coll-folder-actions-menus">
                                        <em className="glyphicon glyphicon-option-horizontal"></em>
                                    </div>
                                </div>
                                <DropDownMenu
                                    menus={folderActionMenu}
                                    onClickItem={(menuItem,e)=>{this.onClickFolderMenuItem(menuItem,collection,folder,e)}}
                                    />
                            </div>
                            <div className="coll-reqs" data-height={reqsHeight}>{requestNodes}</div>
                        </div>
                    )
                })
                let notInFolderReqs = collection.requests.filter((req) => {
                    return !req.folderId
                })
                let notInFolderReqNodes
                if (notInFolderReqs.length) {
                    notInFolderReqNodes = notInFolderReqs.map((req, index) => {
                        foldersHeight += 30
                        return this.getReqNode(req, collection, index)
                    })
                }
                let requestNum = collection.requests.length
                if (!collection.folders.length && !requestNum) {
                    foldersHeight = 40
                    folderNodes =
                        <div className="coll-folder">
                            <div className="no-request-tip">
                                Add requests to this collection and create folders to organize them.
                            </div>
                        </div>
                }
                return (
                    <div className={collClasses} key={index}>
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
                                    <div className="coll-reqnum-text">
                                        {
                                            requestNum === 0 ? 'No Request' : (
                                                requestNum === 1 ? '1 Request' : (
                                                    requestNum + ' Requests'
                                                )
                                            )
                                        }
                                    </div>
                                    <div className="coll-date">{Util.getLocaleDate(collection.createTime)}</div>
                                </div>
                            </div>
                            <div className="coll-actions">
                                <div className="coll-actions-menus" onClick={(e)=>{this.toggleCollActionMenu(e)}}>
                                    <em className="glyphicon glyphicon-option-horizontal"></em>
                                </div>
                            </div>
                            <DropDownMenu
                                menus={collectionActionMenu}
                                onClickItem={(menuItem,e)=>{this.onClickCollectionMenuItem(menuItem,collection,e)}}
                                />
                        </div>
                        <div className="coll-folders" data-height={foldersHeight}>
                            {folderNodes}
                            {notInFolderReqNodes}
                        </div>
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
                <div className="mod-collection-actions">
                    <span className="icon-wrap" onClick={(e)=>{this.clearLocalStorage(e)}}
                          title="Clear all local storage data">
                        <em className="glyphicon glyphicon-trash"></em>
                    </span>
                    <span className="icon-wrap" onClick={(e)=>{this.createCollection(e)}} title="Add new collection">
                        <em className="glyphicon glyphicon-briefcase"></em>
                        <em className="glyphicon glyphicon-plus"></em>
                    </span>
                    <span className="icon-wrap" onClick={(e)=>{this.importCollection(e)}}
                          title="Import collection from NEI">
                        <em className="glyphicon glyphicon-import"></em>
                    </span>
                </div>
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
            setTimeout(() => {
                nextSibling.style.height = 'auto'
            }, 500)
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
        nextSibling.style.height = nextSibling.dataset.height + 'px'
        if (isExpanded) {
            setTimeout(() => {
                nextSibling.style.height = 'auto'
            }, 500)
        } else {
            setTimeout(() => {
                nextSibling.style.height = '0px'
            }, 0)
        }
        // hide action menu
        target.classList.remove('show-action-menu')
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
        let target = evt.currentTarget
        target.parentNode.classList.toggle('show-action-menu')
        target.nextSibling.style.top = (target.offsetTop + 30) + 'px'
    }

    onClickCollectionMenuItem(menuItem, collection, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
        switch (menuItem) {

            case 'Edit host':
                return ModalAction.openEditCollHostModal(collection)

            case 'Add folder':
                return ModalAction.openAddFolderModal(collection)

            case 'Edit':
                return ModalAction.openEditCollModal(collection)

            case 'Synchronize':
                return ModalAction.openSyncCollModal(collection)

            case 'Run all':
                return ModalAction.openRunCollModal(collection)

            case 'Delete':
                return ModalAction.openDeleteCollModal(collection)

            default:
                break
        }
    }

    onClickFolderMenuItem(menuItem, collection, folder, evt) {
        evt.stopPropagation()
        evt.currentTarget.parentNode.parentNode.classList.remove('show-action-menu')
        let data = Object.assign({
            collectionId: collection.id
        }, folder)
        switch (menuItem) {

            case 'Edit host':
                return ModalAction.openEditFolderHostModal(data)

            case 'Edit':
                return ModalAction.openEditFolderModal(data)

            case 'Delete':
                return ModalAction.openDeleteFolderModal(data)

            default:
                break

        }
    }

    onMouseLeaveFolder(evt) {
        evt.stopPropagation()
        evt.currentTarget.classList.remove('show-action-menu')
    }

    createCollection(evt) {
        ModalAction.openCreateCollModal()
    }

    importCollection(evt) {
        ModalAction.openImportCollModal()
    }

    clearLocalStorage(evt) {
        ModalAction.openClearLocalStorageModal()
    }

}

export default Collections
