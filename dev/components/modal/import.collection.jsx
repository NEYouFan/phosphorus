//author @huntbao
'use strict'

import './import.collection.styl'
import classNames from 'classnames'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class CreateCollection extends ModalBody {

    constructor(props) {
        super(props)
        this.state = Object.assign({
            id: '',
            label: "Please input your NEI project's id",
            error: false
        }, props)
    }

    getBody() {
        let classes = classNames({
            'mod-import-collection': true,
            'error': this.state.error
        })
        return (
            <div className={classes}>
                <label>
                    <span>{this.state.label}</span>
                    <input
                        value={this.state.id}
                        autoFocus="true"
                        type="text"
                        onChange={(e) => {this.onChangeId(e)}} />
                </label>
            </div>
        )
    }

    onChangeId(evt) {
        this.setState({
            id: evt.target.value,
            error: false
        })
    }

    onClickCancel(evt) {
        super.onClickCancel(evt)
        this.setState({
            error: false
        })
    }

    doAction() {
        let id = this.state.id.trim()
        if (!id) {
            return this.setState({
                error: true
            })
        }
        this.close()
        this.doIt()
        this.resetState()
    }

    doIt() {
        SideTabAction.importCollection({
            id: this.state.id
        })
    }

    resetState() {
        this.setState({
            id: '',
            error: false
        })
    }

}

export default CreateCollection
