//author @huntbao
'use strict'
import React from 'react'
import classNames from 'classnames'
import ModalAction from '../../actions/modalaction'

class ModalBodyFactory extends React.Component {

    render() {
        return (
            <div className="modal-con">
                <div className="modal-bd">
                    {this.getBody()}
                </div>
                {this.getFooter()}
            </div>
        )
    }

    getBody() {
        // implements in subclass
    }

    getFooter() {
        return (
            <div className="modal-ft">
                <a href="#" className="modal-cancel"
                   onClick={(e)=>{this.onClickCancel(e)}}>{this.props.modal.cancelText}</a>
                <button className="modal-ok" onClick={(e)=>{this.onClickOk(e)}}>{this.props.modal.okText}</button>
            </div>
        )
    }

    onClickCancel(evt) {
        evt.preventDefault()
        this.close()
    }

    onClickOk(evt) {
        evt.preventDefault()
        this.close()
    }

    close() {
        ModalAction.closeModal()
    }
}

export default ModalBodyFactory
