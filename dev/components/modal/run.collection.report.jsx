//author @huntbao
'use strict'
import Tip from './tip.jsx'

class RunCollectionReport extends Tip {

    getBody() {
        let data = this.props.modal.data
        return (
            <div className="mod-tip-modal">
                <p>Total: <em>{this.getRequestExp(data.total)}</em></p>
                <p>Cancelled:  <em>{this.getRequestExp(data.cancelled)}</em></p>
                <p>Succeed:  <em className="success">{this.getRequestExp(data.succeed)}</em></p>
                <p>Failed:  <em className="fail">{this.getRequestExp(data.failed)}</em></p>
                <p className="s-tip">Notice: Expand the collection, you will see the request status flag. If you want to review request detail, you need to click the send button.</p>
            </div>
        )
    }

    getRequestExp(num) {
        switch (num) {
            case 0:
                return '0'
            case 1:
                return '1 request'
            default:
                return `${num} requests`
        }
    }

}

export default RunCollectionReport
