//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class ClearLocalStorage extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>Are you sure you want to clear all local storage data?</p>
            </div>
        )
    }

    doAction(evt) {
        this.close()
        SideTabAction.clearLocalStorage()
    }

}

export default ClearLocalStorage
