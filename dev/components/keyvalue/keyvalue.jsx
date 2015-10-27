//author @huntbao
'use strict'

import './keyvalue.styl'
import React from 'react'
import classNames from 'classnames'

let ReactPropTypes = React.PropTypes

/** @namespace this.props.kvs */
let KeyValue = React.createClass({

    propTypes: {
        toggleCheck: ReactPropTypes.func.isRequired,
        addKVRow: ReactPropTypes.func.isRequired,
        removeKVRow: ReactPropTypes.func.isRequired,
        editKV: ReactPropTypes.func.isRequired,
        keyChange: ReactPropTypes.func.isRequired,
        valueChange: ReactPropTypes.func.isRequired
    },

    render() {
        let total = this.props.kvs.length
        let nodes = this.props.kvs.map((kv, index) => {
            let rowClasses = classNames({
                'kv-row': true,
                'removable': !kv.pathVariable
            })
            let okSignClasses = classNames({
                'glyphicon glyphicon-ok-sign': true,
                'checked': kv.checked
            })
            return (
                <div className={rowClasses} key={index}>
                    <div className={okSignClasses} onClick={this.toggleCheck.bind(this, index)}></div>
                    <div className="input-wrap"
                         onClick={this.clickRow.bind(this, index)}
                         onFocus={this.focusRow.bind(this, index)}
                         onBlur={this.blurRow}
                        >
                        <input
                            placeholder={kv.keyPlaceholder}
                            value={kv.key}
                            readOnly={kv.pathVariable}
                            onChange={this.onKeyChange.bind(this, index)}
                            />
                        <input
                            placeholder={kv.valuePlaceholder}
                            value={kv.value}
                            onChange={this.onValueChange.bind(this, index)}
                            />
                    </div>
                    {index === total - 1 ?
                        <div className="glyphicon glyphicon-edit" onClick={this.editKV}></div>
                        :
                        <div className="glyphicon glyphicon-remove" onClick={this.removeRow.bind(this, index)}></div>
                    }
                </div>
            )
        })
        let kvClassess = classNames({
            'mod-kv': true,
            'hide': !this.props.tabCons.showKV
        })
        return (
            <div className={kvClassess}>
                {nodes}
            </div>
        )
    },

    toggleCheck(rowIndex) {
        this.props.toggleCheck(rowIndex)
    },

    clickRow(rowIndex) {
        if (rowIndex === this.props.kvs.length - 1) {
            this.props.addKVRow()
        }
    },

    focusRow(rowIndex, evt) {
        this.clickRow(rowIndex)
        evt.currentTarget.classList.add('active')
    },

    blurRow(evt) {
        evt.currentTarget.classList.remove('active')
    },

    removeRow(rowIndex) {
        this.props.removeKVRow(rowIndex)
    },

    editKV() {
        this.props.editKV()
    },

    onKeyChange(rowIndex, evt) {
        let value = evt.target.value
        this.props.keyChange(rowIndex, value)
    },

    onValueChange(rowIndex, evt) {
        let value = evt.target.value
        this.props.valueChange(rowIndex, value)
    }

})


export default KeyValue