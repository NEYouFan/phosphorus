//author @huntbao
'use strict'
import './edit.coll.host.styl'
import ReactDOM from 'react-dom'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditCollHost extends ModalBody {

    constructor(props) {
        super(props)
        this.state = {
            host: this.props.modal.data.host
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).querySelectorAll('input')[0].select()
    }

    getBody() {
        return (
            <div className="mod-edit-host">
                {this.getTip()}
                <input
                    autoFocus="true"
                    type="url"
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

    doAction() {
        this.close()
        SideTabAction.changeCollHost(this.props.modal.data, this.state.host)
    }

}

export default EditCollHost
