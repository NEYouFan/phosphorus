//author @huntbao
'use strict'
import './collections.styl'
import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

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
            hide: this.props.tabs.activeTabName !== 'Collections'
        })
        let collections = this.props.collections
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
                            </div>
                            <div className="coll-reqs" data-height={reqsHeight}>{requestNodes}</div>
                        </div>
                    )
                })
                return (
                    <div className="coll" key={index}>
                        <div className="coll-wrap" onClick={(e) => {this.toggleCollSlide(e)}}>
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
        let target = evt.target
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
        let target = evt.target
        let nextSibling = target.nextSibling
        target.classList.toggle('expand')
        target.parentNode.parentNode.style.height = 'auto'
        nextSibling.classList.toggle('expand')
        let isExpanded = nextSibling.classList.contains('expand')
        let height = (isExpanded ? (nextSibling.dataset.height) : 0) + 'px'
        nextSibling.style.height = height
    }

}

export default Collections