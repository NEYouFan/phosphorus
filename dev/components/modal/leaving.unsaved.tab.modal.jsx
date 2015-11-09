//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'

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
        console.log(this.props.modal.data.nextRequestId)
    }

}

export default LeavingUnsavedTabModal
