//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'
import SideTabAction from '../../actions/sidtabaction'

class SyncCollection extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                <p>NEI project id is: <em>{this.props.modal.data.id}</em></p>
                <p>Are you sure you want to synchronize with NEI?</p>
                <p className="s-tip">Notice: all of the collection's data you saved will not be removed.</p>
            </div>
        )
    }

    doAction(evt) {
        this.close()
        SideTabAction.syncCollection(this.props.modal.data)
    }

}

export default SyncCollection
