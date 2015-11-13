//author @huntbao
'use strict'

import CreateCollection from './create.collection.jsx'
import SideTabAction from '../../actions/sidtabaction'

class EditCollection extends CreateCollection {

    componentWillReceiveProps() {
        this.setState({
            name: this.props.modal.data.name,
            description: this.props.modal.data.description
        })
    }

    doIt() {
        SideTabAction.editCollection({
            name: this.state.name,
            description: this.state.description,
            collection: this.props.modal.data
        })
    }

}

export default EditCollection
