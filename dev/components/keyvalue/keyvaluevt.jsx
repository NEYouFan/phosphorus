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
        let valueTypes = ['String', 'Number', 'Boolean', 'Array', 'Object', 'Variable']
        let getOptionNodes = (types) => {
            return types.map((io, index) => {
                return <option value={io.toLowerCase()} key={index}>{io}</option>
            })
        }
        let getChildNodes = () => {
            if (kv.valueType === 'array') {
                let childValueTypes = valueTypes.concat()
                // child type has no `Array`
                _.remove(childValueTypes, (type) => {
                    return type === 'Array'
                })
                return (
                    <select value={kv.childValueType} onChange={(e) => {this.changeKVChildValueType(rowIndex,e)}} disabled={!kv.childTypeChangeable}>
                        {getOptionNodes(childValueTypes)}
                    </select>
                )
            }
        }
        return (
            <div className={classes} onFocus={(e)=>{this.focus(kv,rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <input {...valueInputProps} />
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}} disabled={!kv.typeChangeable}>
                    {getOptionNodes(valueTypes)}
                </select>
                {getChildNodes()}
            </div>
        )
    }

}


export default KeyValueVT