//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class DeletingCollection extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>Are you sure you want to delete <em>{this.props.modal.data.name}</em>?</p>
            </div>
        )
    }

    doAction() {
        SideTabAction.deleteCollection(this.props.modal.data)
    }

}

export default DeletingCollection
