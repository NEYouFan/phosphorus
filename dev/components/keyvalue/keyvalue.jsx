//author @huntbao
'use strict'

import './keyvalue.styl'
import React from 'react'
import classNames from 'classnames'

/** @namespace this.props.kvs */
let KeyValue = React.createClass({

    render() {
        let total = this.props.kvs.length
        let nodes = this.props.kvs.map((kv, index) => {
            let rowClasses = classNames({
                'kv-row': true,
                'removable': !kv.readonly
            })
            let okSignClasses = classNames({
                'glyphicon glyphicon-ok-sign': true,
                'checked': kv.checked
            })
            let keyInputProps = {
                placeholder: kv.keyPlaceholder,
                value: kv.key,
                readOnly: kv.readonly,
                onChange: this.changeKey.bind(this, index),
                list: kv.keyDataList
            }
            let valueInputProps = {
                placeholder: kv.keyPlaceholder,
                value: kv.value,
                onChange: this.changeValue.bind(this, index),
                list: kv.valueDataList
            }
            return (
                <div className={rowClasses} key={index}>
                    <div className={okSignClasses} onClick={this.toggle.bind(this, index)}></div>
                    <div className="input-wrap"
                         onFocus={this.focus.bind(this, index)}
                         onBlur={this.blur}
                        >
                        <input {...keyInputProps} />
                        <input {...valueInputProps}/>
                    </div>
                    {index === total - 1 ?
                        <div className="glyphicon glyphicon-edit" onClick={this.edit}></div>
                        :
                        <div className="glyphicon glyphicon-remove" onClick={this.remove.bind(this, index)}></div>
                    }
                </div>
            )
        })
        let kvClasses = classNames({
            'mod-kv': true,
            'hide': !this.props.showKV
        })
        return (
            <div className={kvClasses}>
                {nodes}
            </div>
        )
    },

    toggle(rowIndex) {
        this.props.toggleKV(rowIndex)
    },

    focus(rowIndex, evt) {
        if (rowIndex === this.props.kvs.length - 1) {
            this.props.addKV(rowIndex)
        }
        evt.currentTarget.classList.add('active')
    },

    blur(evt) {
        evt.currentTarget.classList.remove('active')
    },

    remove(rowIndex) {
        this.props.removeKV(rowIndex)
    },

    edit() {
        this.props.editKV()
    },

    changeKey(rowIndex, evt) {
        this.props.changeKVKey(rowIndex, evt.target.value)
    },

    changeValue(rowIndex, evt) {
        this.props.changeKVValue(rowIndex, evt.target.value)
    }

})


export default KeyValue