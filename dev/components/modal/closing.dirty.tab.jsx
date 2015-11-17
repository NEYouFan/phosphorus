//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import ReqTabAction from '../../actions/reqtabaction'
import ReqTabConAction from '../../actions/reqtabconaction'

class ClosingUnsavedTab extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>Current tab contains unsaved changes.</p>
                <p>Are you sure you want to close?</p>
            </div>
        )
    }

    doAction(evt) {
        this.close()
        let data = this.props.modal.data
        ReqTabAction.removeTab(data.tabIndex)
        ReqTabConAction.removeCon(data.tabIndex)
        if (data.addNewTab) {
            ReqTabAction.addTab()
            ReqTabConAction.addCon()
            ReqTabAction.switchTab(0)
            return
        }
        ReqTabAction.switchTab(data.nextActiveIndex)
    }

}

export default ClosingUnsavedTab
