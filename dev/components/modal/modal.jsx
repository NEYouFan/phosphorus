//author @huntbao
'use strict'
import './modal.styl'
import React from 'react'
import classNames from 'classnames'
import AppConstants from '../../constants/constants'
import ModalAction from '../../actions/modalaction'
import EditCollHost from './edit.coll.host.jsx'
import EditFolderHost from './edit.folder.host.jsx'
import Tip from './tip.jsx'
import LeavingDirtyTab from './leaving.dirty.tab.jsx'
import ClosingDirtyTab from './closing.dirty.tab.jsx'
import CreateCollection from './create.collection.jsx'
import ImportCollection from './import.collection.jsx'
import EditCollection from './edit.collection.jsx'
import SyncCollection from './sync.collection.jsx'
import DeleteCollection from './deleting.collection.jsx'
import ClearLocalStorage from './clear.localstorage.jsx'
import CreateFolder from './create.folder.jsx'
import EditFolder from './edit.folder.jsx'
import DeleteFolder from './deleting.folder.jsx'
import SaveNewRequest from './save.new.request.jsx'
import EditRequest from './edit.request.jsx'
import DeletingRequest from './deleting.request.jsx'
import MoveRequest from './moving.request.jsx'

class Modal extends React.Component {

    render() {
        let classes = classNames({
            'mod-modal': true,
            'modal-open': this.props.modal.open
        })
        return (
            <div className={classes} onClick={(e)=>{this.onClick(e)}}>
                <div className="modal-wrap" onClick={(e)=>{this.onClickBody(e)}}>
                    <div className="modal-hd">
                        <div className="modal-title">{this.props.modal.title}</div>
                        <div className="modal-close" onClick={(e)=>{this.onClickClose(e)}}>
                            <em className="glyphicon glyphicon-remove"></em>
                        </div>
                    </div>
                    {this.getBody()}
                </div>
            </div>
        )
    }

    getBody() {
        switch (this.props.modal.type) {
            case AppConstants.MODAL_EDIT_COLL_HOST:
                return (
                    <EditCollHost modal={this.props.modal}/>
                )

            case AppConstants.MODAL_EDIT_FOLDER_HOST:
                return (
                    <EditFolderHost modal={this.props.modal}/>
                )

            case AppConstants.MODAL_SAVE_BLANK_URL_TIP:
                return (
                    <Tip modal={this.props.modal}/>
                )

            case AppConstants.MODAL_SAVE_NEW_REQUEST:
                return (
                    <SaveNewRequest modal={this.props.modal}/>
                )

            case AppConstants.MODAL_EDIT_REQUEST:
                return (
                    <EditRequest
                        name={this.props.modal.data.name}
                        description={this.props.modal.data.description}
                        nameLabel="Request name"
                        modal={this.props.modal}/>
                )

            case AppConstants.MODAL_MOVE_REQUEST:
                return (
                    <MoveRequest modal={this.props.modal}/>
                )

            case AppConstants.MODAL_DELETE_REQUEST:
                return (
                    <DeletingRequest modal={this.props.modal}/>
                )

            case AppConstants.MODAL_LEAVING_DIRTY_TAB:
                return (
                    <LeavingDirtyTab modal={this.props.modal}/>
                )

            case AppConstants.MODAL_CLOSING_DIRTY_TAB:
                return (
                    <ClosingDirtyTab modal={this.props.modal}/>
                )

            case AppConstants.MODAL_CREATE_COLLECTION:
                return (
                    <CreateCollection
                        name=""
                        description=""
                        nameLabel="Collection name"
                        modal={this.props.modal}/>
                )

            case AppConstants.MODAL_IMPORT_COLLECTION:
                return (
                    <ImportCollection modal={this.props.modal}/>
                )

            case AppConstants.MODAL_CLEAR_LOCAL_STORAGE:
                return (
                    <ClearLocalStorage modal={this.props.modal}/>
                )

            case AppConstants.MODAL_EDIT_COLLECTION:
                return (
                    <EditCollection
                        name={this.props.modal.data.name}
                        description={this.props.modal.data.description}
                        modal={this.props.modal}/>
                )

            case AppConstants.MODAL_SYNC_COLLECTION:
                return (
                    <SyncCollection modal={this.props.modal}/>
                )

            case AppConstants.MODAL_CREATE_FOLDER:
                return (
                    <CreateFolder
                        name=""
                        description=""
                        nameLabel="Folder name"
                        modal={this.props.modal}/>
                )

            case AppConstants.MODAL_EDIT_FOLDER:
                return (
                    <EditFolder
                        name={this.props.modal.data.name}
                        description={this.props.modal.data.description}
                        nameLabel="Folder name"
                        modal={this.props.modal}/>
                )

            case AppConstants.MODAL_DELETE_COLLECTION:
                return (
                    <DeleteCollection modal={this.props.modal}/>
                )

            case AppConstants.MODAL_DELETE_FOLDER:
                return (
                    <DeleteFolder modal={this.props.modal}/>
                )

            default:
                break
        }
    }

    onClick(evt) {
        this.close()
    }

    onClickBody(evt) {
        evt.stopPropagation()
    }

    onClickClose(evt) {
        this.close()
    }

    close() {
        ModalAction.closeModal()
    }
}

export default Modal
