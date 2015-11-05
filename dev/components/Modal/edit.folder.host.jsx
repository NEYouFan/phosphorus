//author @huntbao
'use strict'
import './edit.coll.host.styl'
import SideTabAction from '../../actions/sidtabaction'
import EditCollHost from './edit.coll.host.jsx'

class EditFolderHost extends EditCollHost {

    getTip() {
        return (
            <div className="tip">
                Change the host of this Folder's requests.
            </div>
        )
    }

    onClickOk(evt) {
        evt.preventDefault()
        this.close()
        SideTabAction.changeFolderHost(this.props.modal.data, this.state.host)
    }

}

export default EditFolderHost
