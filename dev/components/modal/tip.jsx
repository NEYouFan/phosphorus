//author @huntbao
'use strict'
import ModalBody from './modal.body.jsx'

class Tip extends ModalBody {

    getBody() {
        return (
            <div className="mod-tip-modal">
                {this.props.modal.data.tip}
            </div>
        )
    }

    getFooter() {
        // return nothing
    }

}

export default Tip
