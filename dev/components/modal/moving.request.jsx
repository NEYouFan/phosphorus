//author @huntbao
'use strict'
import CreateCollection from './create.collection.jsx'
import classNames from 'classnames'
import SideTabAction from '../../actions/sidtabaction'

class DeletingReq extends CreateCollection {

    constructor(props) {
        super(props)
        this.state = Object.assign({
            collectionId: '',
            folderId: '',
            error: false
        }, props)
    }

    getBody() {
        let classes = classNames({
            'mod-create-collection': true,
            'mod-move-req': true,
            'move-req-error': this.state.error
        })
        let getCollNodes = (collections) => {
            let results = []
            collections.forEach((c) => {
                results.push({
                    name: c.name,
                    id: c.id
                })
                c.folders.forEach((f) => {
                    results.push({
                        name: c.name + '/' + f.name,
                        id: c.id + '/' + f.id
                    })
                })
            })
            let options = results.map((r, index) => {
                return <option value={r.id} key={index}>{r.name}</option>
            })
            return (
                <select onChange={(e)=>{this.onChangeColl(e)}} size={options.length + 1}>
                    <option value="">Select</option>
                    {options}
                </select>
            )
        }
        return (
            <div className={classes}>
                <label>
                    <span>Choose where you want to place the request:</span>
                    {getCollNodes(this.props.modal.data.collections)}
                </label>
            </div>
        )
    }

    onChangeColl(evt) {
        let values = evt.target.value.split('/')
        this.setState({
            collectionId: values[0],
            folderId: values[1],
            error: false
        })
    }

    onClickCancel(evt) {
        super.onClickCancel(evt)
        this.setState({
            error: false
        })
    }

    doAction() {
        if (!this.state.collectionId) {
            return this.setState({
                error: true
            })
        }
        this.close()
        this.doIt()
        this.resetState()
    }

    doIt() {
        let req = this.props.modal.data.req
        if (req.collectionId === this.state.collectionId && req.folderId === this.state.folderId) {
            // no change
            return
        }
        SideTabAction.moveRequest({
            collectionId: this.state.collectionId,
            folderId: this.state.folderId,
            req: req
        })
    }

    resetState() {
        this.setState({
            collectionId: '',
            folderId: '',
            error: false
        })
    }

}

export default DeletingReq
