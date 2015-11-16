//author @huntbao
'use strict'
import DeletingCollection from './deleting.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class DeletingFolder extends DeletingCollection {

    doAction() {
        this.close()
        SideTabAction.deleteFolder(this.props.modal.data)
    }

}

export default DeletingFolder
