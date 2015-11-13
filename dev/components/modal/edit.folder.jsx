//author @huntbao
'use strict'

import CreateCollection from './create.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditFolder extends CreateCollection {

    doIt() {
        SideTabAction.editFolder({
            name: this.state.name,
            description: this.state.description,
            folder: this.props.modal.data
        })
    }

}

export default EditFolder
