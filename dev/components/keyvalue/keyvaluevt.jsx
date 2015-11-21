//author @huntbao
'use strict'

import classNames from 'classnames'
import KeyValueT from './keyvaluet.jsx'

class KeyValueVT extends KeyValueT {

    render() {
        let total = this.props.kvs.length
        let getSubNodes = (kv) => {
            if (kv.childValueType === 'object') {
                return kv.values.map((skv, index) => {
                    return (
                        <div className="sub-kv-row" key={index}>
                            <div className="brace-start"></div>
                            {getNodes(skv.values, skv)}
                            <div className="brace-end"></div>
                        </div>
                    )
                })
            }
            if (/^object$/.test(kv.valueType)) {
                return (
                    <div className="sub-kv-row">
                        <div className="brace-start"></div>
                        {getNodes(kv.values, kv)}
                        <div className="brace-end"></div>
                    </div>
                )
            }
            if (/^array/.test(kv.valueType)) {
                return (
                    <div className="sub-kv-row">
                        <div className="bracket-start"></div>
                        {getNodes(kv.values, kv)}
                        <div className="bracket-end"></div>
                    </div>
                )
            }
        }
        let getNodes = (kvs, parentKV) => {
            return kvs.map((kv, index) => {
                kv.index = parentKV ? (parentKV.index + '.' + index) : index.toString()
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
                        this.changeKey(e, kv.index, kv)
                    },
                    list: kv.keyDataList,
                    className: classNames({
                        'inp-error': kv.keyError,
                        'hide': kv.keyVisible === false
                    })
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
                } else if (kv.index === '0' && !kv.readonly) {
                    titleTip = (
                        <div className="title-tip" title="You can paste JSON here"></div>
                    )
                }
                let kvRowWrapClasses = classNames({
                    'kv-row-wrap': true,
                    'hide': parentKV && parentKV.childValueType === 'object'
                })
                return (
                    <div className={rowClasses} key={index} onMouseOut={(e)=>{this.mouseOutRow(e)}} onMouseOver={(e)=>{this.mouseOverRow(e)}}>
                        <div className={kvRowWrapClasses}>
                            <div className={okSignClasses} onClick={()=>{this.toggle(kv.index, kv)}}></div>
                            {inputs}
                            {titleTip}
                            <div className="glyphicon glyphicon-remove" onClick={()=>{this.remove(kv.index)}}></div>
                        </div>
                        {getSubNodes(kv)}
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