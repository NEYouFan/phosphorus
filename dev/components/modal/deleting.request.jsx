//author @huntbao
'use strict'
import DeletingCollection from './deleting.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class DeletingReq extends DeletingCollection {

    doAction() {
        this.close()
        SideTabAction.deleteRequest(this.props.modal.data)
    }

}

export default DeletingReq
