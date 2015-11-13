//author @huntbao
'use strict'
import DeletingCollection from './deleting.collection.modal.jsx'
import SideTabAction from '../../actions/sidtabaction'

class DeletingFolder extends DeletingCollection {

    doAction() {
        SideTabAction.deleteFolder(this.props.modal.data)
    }

}

export default DeletingFolder
