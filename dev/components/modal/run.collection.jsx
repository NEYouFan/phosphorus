//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class RunCollection extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                {this.getReqNumberTip()}
            </div>
        )
    }

    getFooter() {
        if (!this.props.modal.data.requests.length) {
            return
        }
        return super.getFooter()
    }

    getReqNumberTip() {
        let num = this.props.modal.data.requests.length
        if (num === 0) {
            return (
                <p>There is no request in current collection.</p>
            )
        } else if (num === 1) {
            return (
                <div>
                    <p>There is only 1 request in current collection.</p>
                    <p>Do you want to run it?</p>
                    <p className="s-tip">Notice: only saved data will be used.</p>
                </div>
            )
        } else {
            return (
                <div>
                    <p>There are {num} requests in current collection.</p>
                    <p>Do you want to run all of them? This maybe take few minutes.</p>
                    <p className="s-tip">Notice: only saved data will be used.</p>
                </div>
            )
        }
    }

    doAction(evt) {
        this.close()
        SideTabAction.runCollection(this.props.modal.data)
    }

}

export default RunCollection
