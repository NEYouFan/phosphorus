//author @huntbao
'use strict'

import './create.collection.modal.styl'
import classNames from 'classnames'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class LeavingUnsavedTabModal extends ModalBody {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            errorName: false
        }
    }

    getBody() {
        let classes = classNames({
            'mod-create-collection': true,
            'error-name': this.state.errorName
        })
        return (
            <div className={classes}>
                <label>
                    <span>Name</span>
                    <input
                        autoFocus="true"
                        type="text"
                        onChange={(e) => {this.onChangeName(e)}} />
                </label>
                <label>
                    <span>Description</span>
                    <textarea
                        onChange={(e) => {this.onChangeDesc(e)}} />
                </label>
            </div>
        )
    }

    onChangeName(evt) {
        this.setState({
            name: evt.target.value,
            errorName: false
        })
    }

    onChangeDesc(evt) {
        this.setState({
            description: evt.target.value
        })
    }

    onClickCancel(evt) {
        evt.preventDefault()
        this.close()
        this.setState({
            errorName: false
        })
    }

    onClickOk(evt) {
        let name = this.state.name.trim()
        if (!name) {
            return this.setState({
                errorName: true
            })
        }
        SideTabAction.createCollection({
            name: this.state.name,
            description: this.state.description
        })
        this.close()
    }

}

export default LeavingUnsavedTabModal
