//author @huntbao
'use strict'

import EditCollection from './edit.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditFolder extends EditCollection {

    doIt() {
        SideTabAction.editFolder({
            name: this.state.name,
            description: this.state.description,
            folder: this.props.modal.data
        })
    }

}

export default EditFolder
