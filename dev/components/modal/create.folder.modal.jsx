//author @huntbao
'use strict'

import CreateCollection from './create.collection.modal.jsx'
import SideTabAction from '../../actions/sidtabaction'

class CreateFolder extends CreateCollection {

    constructor() {
        let props = {
            nameLabel: 'Folder name',
            descriptionLabel: 'Description'
        }
        super(props)
    }

    doAction() {
        SideTabAction.createFolder({
            name: this.state.name,
            description: this.state.description,
            collection: this.props.modal.data
        })
    }

}

export default CreateFolder
