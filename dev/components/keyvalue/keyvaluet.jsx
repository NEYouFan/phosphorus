//author @huntbao
'use strict'

import React from 'react'
import classNames from 'classnames'
import KeyValue from './keyvalue.jsx'

class KeyValueT extends KeyValue {

    render() {
        let total = this.props.kvs.length
        let getSubNodes = (kv) => {
            if (/^(object|array|parent)$/.test(kv.valueType)) {
                return getNodes(kv.value, kv)
            }
        }
        let getNodes = (kvs, parentKV) => {
            return kvs.map((kv, index) => {
                let rowClasses = classNames({
                    'kv-row': true,
                    'removable': !kv.readonly,
                    'onlyone': total === 1
                })
                let okSignClasses = classNames({
                    'glyphicon glyphicon-ok-sign': true,
                    'checked': kv.checked
                })
                let keyInputProps = {
                    placeholder: kv.keyPlaceholder,
                    value: kv.key,
                    readOnly: kv.readonly,
                    onChange: (e) => {
                        this.changeKey(e, index, kv)
                    },
                    list: kv.keyDataList,
                    className: kv.keyError ? 'inp-error' : ''
                }
                let inputs = this.getInputs(kv, index, keyInputProps)
                return (
                    <div className={rowClasses} key={index}>
                        <div className="kv-row-wrap">
                            <div className={okSignClasses} onClick={()=>{this.toggle(index, kv)}}></div>
                            {inputs}
                            <div className="glyphicon glyphicon-remove" onClick={()=>{this.remove(index)}}></div>
                        </div>
                        {getSubNodes(kv)}
                    </div>
                )
            })
        }
        let nodes = getNodes(this.props.kvs)
        let kvClasses = classNames({
            'mod-kv': true
        })
        return (
            <div className={kvClasses}>
                {nodes}
            </div>
        )
    }

    getInputs(kv, rowIndex, keyInputProps) {
        let valueType = kv.valueType
        let classes = classNames({
            'input-wrap': true
        })
        return (
            <div className={classes} onFocus={this.focus.bind(this, rowIndex)} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}}>
                    <option value="string">String</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                    <option value="array">Array</option>
                    <option value="object">Object</option>
                    <option value="parent">&lt;Parent&gt;</option>
                </select>
            </div>
        )
    }

    changeKVValueType(rowIndex, evt) {
        this.props.changeKVValueType(rowIndex, evt.target.value)
    }

}


export default KeyValueT