//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'

class LeavingUnsavedTabModal extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>Current tab contains unsaved changes.</p>
                <p>Are you sure you want to leave?</p>
            </div>
        )
    }

    onClickOk(evt) {
        evt.preventDefault()
        this.close()
        let data = this.props.modal.data
        ReqTabAction.changeTab(data.tab)
        ReqTabConAction.updateConByRequest(data.request, data.collection)
    }

}

export default LeavingUnsavedTabModal
