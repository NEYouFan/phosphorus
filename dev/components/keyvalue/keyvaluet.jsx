//author @huntbao
'use strict'

import React from 'react'
import classNames from 'classnames'
import KeyValue from './keyvalue.jsx'

class KeyValueT extends KeyValue {

    render() {
        let total = this.props.kvs.length
        let getSubNodes = (kv) => {
            if (/^(object|array)$/.test(kv.valueType)) {
                return getNodes(kv.value, kv, kv.valueType)
            }
        }
        let getNodes = (kvs, parentKV, parentValueType) => {
            return kvs.map((kv, index) => {
                kv.index = parentKV ? (parentKV.index + '.' + index) : index.toString()
                let rowClasses = classNames({
                    'kv-row': true,
                    'removable': !kv.readonly,
                    'onlyone': total === 1,
                    'kv-row-array': parentValueType === 'array',
                    'kv-row-object': parentValueType === 'object'
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
                        this.changeKey(e, kv.index, kv)
                    },
                    list: kv.keyDataList,
                    className: kv.keyError ? 'inp-error' : ''
                }
                let inputs = this.getInputs(kv, kv.index, keyInputProps)
                return (
                    <div className={rowClasses} key={index} onMouseOut={(e)=>{this.mouseOutRow(e)}} onMouseOver={(e)=>{this.mouseOverRow(e)}}>
                        <div className="kv-row-wrap">
                            <div className={okSignClasses} onClick={()=>{this.toggle(kv.index, kv)}}></div>
                            {inputs}
                            <div className="glyphicon glyphicon-remove" onClick={()=>{this.remove(kv.index)}}></div>
                        </div>
                        <div className="sub-kv-row">{getSubNodes(kv)}</div>
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
        let inputValueOptions = ['String', 'Number', 'Boolean', 'Array', 'Object']
        let layers = rowIndex.split('.').length
        if (layers > 1) {
            inputValueOptions.push('Parent')
        }
        let optionNodes = inputValueOptions.map((io, index) => {
            return <option value={io.toLowerCase()} key={index}>{io}</option>
        })
        return (
            <div className={classes} onFocus={(e)=>{this.focus(rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}} disabled={!kv.typeChangeable}>
                    {optionNodes}
                </select>
            </div>
        )
    }

    focus(rowIndex, evt) {
        this.props.addKV(rowIndex)
        evt.currentTarget.classList.add('active')
    }

    changeKVValueType(rowIndex, evt) {
        this.props.changeKVValueType(rowIndex, evt.target.value)
    }

    mouseOverRow(e) {
        let node = e.currentTarget
        if (!node.classList.contains('kv-row-array') && !node.classList.contains('kv-row-object')) return
        e.stopPropagation()
        node = node.parentNode
        node.classList.add('hover')
        while(true) {
            node = node.parentNode
            if (node.classList.contains('sub-kv-row')) {
                node.classList.remove('hover')
            }
            if (node.classList.contains('mod-kv')) {
                break
            }
        }
    }

    mouseOutRow(e) {
        e.currentTarget.parentNode.classList.remove('hover')
    }

}


export default KeyValueT