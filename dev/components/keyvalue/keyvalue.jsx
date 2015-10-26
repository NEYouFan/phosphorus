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
        editKV: ReactPropTypes.func.isRequired
    },

    render() {
        let total = this.props.kvs.length
        let nodes = this.props.kvs.map((kv, index) => {
            let okSignClasses = classNames({
                'glyphicon glyphicon-ok-sign': true,
                'checked': kv.checked
            })
            return (
                <div className="kv-row" key={index}>
                    <div className={okSignClasses} onClick={this.toggleCheck.bind(this, index)}></div>
                    <div className="input-wrap"
                         onClick={this.clickRow.bind(this, index)}
                         onFocus={this.focusRow.bind(this, index)}
                         onBlur={this.blurRow}
                        >
                        <input placeholder={kv.keyPlaceholder}/>
                        <input placeholder={kv.valuePlaceholder}/>
                    </div>
                    {index === total - 1 ?
                        <div className="glyphicon glyphicon-edit" onClick={this.editKV}></div>
                        :
                        <div className="glyphicon glyphicon-remove" onClick={this.removeRow.bind(this, index)}></div>
                    }
                </div>
            )
        })
        return (
            <div className="mod-kv">
                {nodes}
            </div>
        )
    },

    toggleCheck(rowIndex) {
        this.props.toggleCheck(this.props.tabIndex, rowIndex)
    },

    clickRow(rowIndex) {
        if (rowIndex === this.props.kvs.length - 1) {
            this.props.addKVRow(this.props.tabIndex)
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
        this.props.removeKVRow(this.props.tabIndex, rowIndex)
    },

    editKV() {
        this.props.editKV()
    }

})


export default KeyValue