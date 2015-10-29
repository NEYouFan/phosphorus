//author @huntbao
'use strict'

import React from 'react'
import classNames from 'classnames'
import KeyValue from './keyvalue.jsx'

class KeyValueX extends KeyValue {

    getInputs(kv, rowIndex, keyInputProps, valueInputProps) {
        let valueType = kv.valueType
        let classes = classNames({
            'input-wrap': true,
            'file-value-type': valueType === 'file'
        })
        return (
            <div className={classes} onFocus={this.focus.bind(this, rowIndex)} onBlur={this.blur}>
                <input {...keyInputProps} />
                <input {...valueInputProps} className="value-text-inp"/>
                <input type="file"/>
                <select value={valueType} onChange={(evt) => {this.changeKVValueType(rowIndex, evt)}}>
                    <option value="text">Text</option>
                    <option value="file">File</option>
                </select>
            </div>
        )
    }

    changeKVValueType(rowIndex, evt) {
        this.props.changeKVValueType(rowIndex, evt.target.value)
    }

}


export default KeyValueX