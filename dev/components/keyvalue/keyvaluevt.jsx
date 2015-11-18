//author @huntbao
'use strict'

import classNames from 'classnames'
import KeyValueT from './keyvaluet.jsx'

class KeyValueVT extends KeyValueT {

    getInputs(kv, rowIndex, keyInputProps, valueInputProps) {
        let valueType = kv.valueType
        let classes = classNames({
            'input-wrap': true
        })
        let inputValueOptions = ['String', 'Number', 'Boolean', 'Array', 'Object']
        let optionNodes = inputValueOptions.map((io, index) => {
            return <option value={io.toLowerCase()} key={index}>{io}</option>
        })
        return (
            <div className={classes} onFocus={(e)=>{this.focus(rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <input {...valueInputProps} />
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}} disabled={!kv.typeChangeable}>
                    {optionNodes}
                </select>
            </div>
        )
    }

}


export default KeyValueVT