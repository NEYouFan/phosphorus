//author @huntbao
'use strict'

import './keyvaluet.styl'
import classNames from 'classnames'
import _ from 'lodash'
import KeyValue from './keyvalue.jsx'

class KeyValueT extends KeyValue {

    render() {
        let total = this.props.kvs.length
        let getSubNodes = (kv) => {
            if (/^(object|array)$/.test(kv.valueType)) {
                return getNodes(kv.values, kv, kv.valueType, kv.childValueType)
            }
        }
        let getNodes = (kvs, parentKV, parentValueType, parentChildValueType) => {
            return kvs.map((kv, index) => {
                kv.index = parentKV ? (parentKV.index + '.' + index) : index.toString()
                let rowClasses = classNames({
                    'kv-row': true,
                    'removable': !kv.readonly,
                    'onlyone': total === 1,
                    'kv-row-object': parentValueType === 'object' || parentChildValueType === 'object'
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
                let valueInputProps = {
                    placeholder: kv.valuePlaceholder,
                    value: kv.value,
                    readOnly: kv.valueReadonly,
                    onChange: (e) => {
                        this.changeValue(e, kv.index, kv)
                    },
                    list: kv.valueDataList,
                    className: kv.valueError ? 'inp-error' : ''
                }
                let inputs = this.getInputs(kv, kv.index, keyInputProps, valueInputProps)
                let titleTip
                if (kv.title) {
                    titleTip = (
                        <div className="res-title-tip" title={kv.title}></div>
                    )
                }
                return (
                    <div className={rowClasses} key={index} onMouseOut={(e)=>{this.mouseOutRow(e)}} onMouseOver={(e)=>{this.mouseOverRow(e)}}>
                        <div className="kv-row-wrap">
                            <div className={okSignClasses} onClick={()=>{this.toggle(kv.index, kv)}}></div>
                            {inputs}
                            {titleTip}
                            <div className="glyphicon glyphicon-remove" onClick={()=>{this.remove(kv.index)}}></div>
                        </div>
                        <div className="sub-kv-row">{getSubNodes(kv)}</div>
                    </div>
                )
            })
        }
        let nodes = getNodes(this.props.kvs)
        let kvClasses = classNames({
            'mod-kv': true,
            'mod-kv-type': true
        })
        return (
            <div className={kvClasses}>
                {nodes}
            </div>
        )
    }

    getInputs(kv, rowIndex, keyInputProps, valueInputProps) {
        let valueType = kv.valueType
        let classes = classNames({
            'input-wrap': true
        })
        let valueTypes = ['String', 'Number', 'Boolean', 'Array', 'Object']
        let getOptionNodes = (types) => {
            return types.map((io, index) => {
                return <option value={io.toLowerCase()} key={index}>{io}</option>
            })
        }
        let getChildNodes = () => {
            if (kv.valueType === 'array') {
                let childValueTypes = valueTypes.concat()
                childValueTypes.push('Parent')
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
            <div className={classes} onFocus={(e)=>{this.focus(rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <select value={valueType} onChange={(e) => {this.changeKVValueType(rowIndex,e)}} disabled={!kv.typeChangeable}>
                    {getOptionNodes(valueTypes)}
                </select>
                {getChildNodes()}
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

    changeKVChildValueType(rowIndex, evt) {
        this.props.changeKVChildValueType(rowIndex, evt.target.value)
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