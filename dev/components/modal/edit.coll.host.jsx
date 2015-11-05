//author @huntbao
'use strict'
import './edit.coll.host.styl'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditCollHost extends ModalBody {

    constructor(props) {
        super(props)
        this.state = {
            host: this.props.modal.data.host
        }
    }

    getBody() {
        return (
            <div className="mod-edit-host">
                {this.getTip()}
                <input
                    autoFoucs="true"
                    type="text"
                    value={this.state.host}
                    onChange={(e) => {this.onChange(e)}}
                    placeholder="Input your host here"/>
            </div>
        )
    }

    getTip() {
        return (
            <div className="tip">
                Change the host of this Collection's requests.
            </div>
        )
    }

    onChange(evt) {
        this.setState({
            host: evt.target.value
        })
    }

    onClickOk(evt) {
        evt.preventDefault()
        this.close()
        SideTabAction.changeCollHost(this.props.modal.data, this.state.host)
    }

}

export default EditCollHost
