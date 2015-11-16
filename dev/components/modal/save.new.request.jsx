//author @huntbao
'use strict'

import CreateCollection from './create.collection.jsx'
import classNames from 'classnames'
import SideTabAction from '../../actions/sidtabaction'

class SaveNewRequest extends CreateCollection {

    constructor(props) {
        super(props)
        this.state = Object.assign({
            collectionId: '',
            folderId: '',
            newCollName: '',
            name: '',
            description: '',
            errorCollName: false
        }, props)
    }

    getBody() {
        let classes = classNames({
            'mod-create-collection': true,
            'mod-save-new-req': true,
            'error-coll-name': this.state.errorCollName
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
                    <span>Choose an existing collection</span>
                    {getCollNodes(this.props.modal.data.collections)}
                </label>
                <label>
                    <span>Or create a new one</span>
                    <input
                        className="new-coll-name"
                        value={this.state.newCollName}
                        type="text"
                        onChange={(e) => {this.onChangeCollName(e)}}/>
                </label>
                <label>
                    <span>Request name</span>
                    <input
                        value={this.state.name}
                        type="text"
                        onChange={(e) => {this.onChangeName(e)}}/>
                </label>
                <label>
                    <span>Description</span>
                    <textarea
                        value={this.state.description}
                        onChange={(e) => {this.onChangeDesc(e)}}/>
                </label>
            </div>
        )
    }

    onChangeColl(evt) {
        let values = evt.target.value.split('/')
        this.setState({
            collectionId: values[0],
            folderId: values[1],
            errorCollName: false
        })
    }

    onChangeCollName(evt) {
        this.setState({
            newCollName: evt.target.value,
            errorCollName: false
        })
    }

    onChangeName(evt) {
        this.setState({
            name: evt.target.value
        })
    }

    onChangeDesc(evt) {
        this.setState({
            description: evt.target.value
        })
    }

    onClickCancel(evt) {
        super.onClickCancel(evt)
        this.setState({
            errorCollName: false
        })
    }

    doAction() {
        if (!this.state.collectionId) {
            let name = this.state.newCollName.trim()
            if (!name) {
                return this.setState({
                    errorCollName: true
                })
            }
        }
        this.close()
        this.doIt()
        this.resetState()
    }

    doIt() {
        SideTabAction.saveRequest({
            collectionId: this.state.collectionId,
            folderId: this.state.folderId,
            newCollName: this.state.newCollName,
            name: this.state.name,
            description: this.state.description,
            tab: this.props.modal.data.tab
        })
    }

    resetState() {
        this.setState({
            newCollName: '',
            name: '',
            description: '',
            errorCollName: false
        })
    }

}

export default SaveNewRequest
