//author @huntbao
'use strict'

import './create.collection.modal.styl'
import classNames from 'classnames'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class CreateCollection extends ModalBody {

    constructor(props) {
        super()
        this.state = Object.assign({
            name: '',
            nameLabel: 'Collection name',
            description: '',
            descriptionLabel: 'Description',
            errorName: false
        }, props)
    }

    getBody() {
        let classes = classNames({
            'mod-create-collection': true,
            'error-name': this.state.errorName
        })
        return (
            <div className={classes}>
                <label>
                    <span>{this.state.nameLabel}</span>
                    <input
                        value={this.state.name}
                        autoFocus="true"
                        type="text"
                        onChange={(e) => {this.onChangeName(e)}} />
                </label>
                <label>
                    <span>{this.state.descriptionLabel}</span>
                    <textarea
                        value={this.state.description}
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
        this.close()
        let name = this.state.name.trim()
        if (!name) {
            return this.setState({
                errorName: true
            })
        }
        this.doAction()
        this.resetState()
    }

    doAction() {
        SideTabAction.createCollection({
            name: this.state.name,
            description: this.state.description
        })
    }

    resetState() {
        this.setState({
            name: '',
            description: '',
            errorName: false
        })
    }

}

export default CreateCollection
