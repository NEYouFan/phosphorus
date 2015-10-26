//author @huntbao
'use strict'

import './keyvalue.styl'
import React from 'react'
import classNames from 'classnames'

let ReactPropTypes = React.PropTypes

/** @namespace this.props.kvs */
let KeyValue = React.createClass({

    propTypes: {
        addKVRow: ReactPropTypes.func.isRequired,
        removeKVRow: ReactPropTypes.func.isRequired,
        editKV: ReactPropTypes.func.isRequired
    },

    getInitialState: function () {
        let obj = {
            checkStates: []
        }
        this.props.kvs.map((kv, index) => {
            obj.checkStates.push(true)
        })
        return obj
    },

    render() {
        let total = this.props.kvs.length
        let nodes = this.props.kvs.map((kv, index) => {
            let okSignClasses = classNames({
                'glyphicon glyphicon-ok-sign': true,
                'checked': this.state.checkStates[index] !== false
            })
            return (
                <div className="kv-row" key={index}>
                    <div className={okSignClasses} onClick={this.toggleCheck.bind(this, index)}></div>
                    <div className="input-wrap"
                         onClick={this.clickRow.bind(this, index)}
                         onFocus={this.focusRow.bind(this, index)}
                         onBlur={this.blurRow.bind(this, index)}
                        >
                        <input placeholder={kv.keyPlaceholder}/>
                        <input placeholder={kv.valuePlaceholder}/>
                    </div>
                    {index === total - 1 ?
                        (<div className="glyphicon glyphicon-edit"
                              onClick={this.editKV}
                            >
                        </div>)
                        :
                        (<div className="glyphicon glyphicon-remove"
                              onClick={this.removeRow.bind(this, index)}
                            >
                        </div>)
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

    toggleCheck(rowIndex, evt) {
        let checkStates = this.state.checkStates
        checkStates[rowIndex] = typeof(checkStates[rowIndex]) === 'undefined' ? false : (!checkStates[rowIndex])
        this.setState(this.state)
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

    blurRow(rowIndex, evt) {
        evt.currentTarget.classList.remove('active')
    },

    removeRow(rowIndex, evt) {
        this.state.checkStates.splice(rowIndex, 1)
        this.setState(this.state)
        this.props.removeKVRow(rowIndex)
    },

    editKV() {
        this.props.editKV()
    }

})


export default KeyValue