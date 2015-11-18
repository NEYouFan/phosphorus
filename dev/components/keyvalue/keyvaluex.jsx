//author @huntbao
'use strict'

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
            <div className={classes} onFocus={(e)=>{this.focus(rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <input {...valueInputProps} className="value-text-inp"/>
                <input type="file" onChange={(e)=>{this.onChangeFile(rowIndex,e)}}/>
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}}>
                    <option value="text">Text</option>
                    <option value="file">File</option>
                </select>
            </div>
        )
    }

    changeKVValueType(rowIndex, evt) {
        this.props.changeKVValueType(rowIndex, evt.target.value)
    }

    onChangeFile(rowIndex, evt) {
        this.props.changeKVFileValue(rowIndex, evt.target)
    }

}


export default KeyValueX