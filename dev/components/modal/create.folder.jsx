//author @huntbao
'use strict'

import CreateCollection from './create.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class CreateFolder extends CreateCollection {

    doIt() {
        SideTabAction.createFolder({
            name: this.state.name,
            description: this.state.description,
            collection: this.props.modal.data
        })
    }

}

export default CreateFolder
