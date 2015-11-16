//author @huntbao
'use strict'

import EditCollection from './edit.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditReq extends EditCollection {

    doIt() {
        SideTabAction.editRequest({
            name: this.state.name,
            description: this.state.description,
            req: this.props.modal.data
        })
    }

}

export default EditReq
