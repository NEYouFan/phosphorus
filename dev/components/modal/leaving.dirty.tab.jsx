//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'

class LeavingUnsavedTab extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>Current tab contains unsaved changes.</p>
                <p>Are you sure you want to leave?</p>
            </div>
        )
    }

    doAction(evt) {
        this.close()
        let data = this.props.modal.data
        SideTabAction.changeActiveReqId(data.reqId)
        ReqTabConAction.updateConByRequest(data.request, data.collection)
    }

}

export default LeavingUnsavedTab
