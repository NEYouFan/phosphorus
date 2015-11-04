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
                let folderNodes = collection.folders.map((folder, index) => {
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
                            <div className="coll-folder-wrap">
                                <div className="coll-folder-icon">
                                    <span className="glyphicon glyphicon-folder-close"></span>
                                </div>
                                <div className="coll-folder-name">{folder.name}</div>
                            </div>
                            <div className="coll-reqs">{requestNodes}</div>
                        </div>
                    )
                })
                return (
                    <div className="coll" key={index}>
                        <div className="coll-wrap">
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
                        <div className="coll-folders">{folderNodes}</div>
                    </div>
                )
            })
        } else {
            collectionNodes = (
                <div className="empty-tip">
                    You haven't created any collections yet. Collections let you group requests together for quick access.
                </div>
            )
        }
        return (
            <div className={className}>
                <div className="mod-collections">{collectionNodes}</div>
            </div>
        )
    }

}

export default Collections