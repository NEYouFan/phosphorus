//author @huntbao
'use strict'

import './keyvalue.styl'
import React from 'react'
import classNames from 'classnames'

class KeyValue extends React.Component {

    render() {
        let total = this.props.kvs.length
        let nodes = this.props.kvs.map((kv, index) => {
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
            let valueInputProps = {
                placeholder: kv.valuePlaceholder,
                value: kv.value,
                onChange: (e) => {
                    this.changeValue(e, index, kv)
                },
                list: kv.valueDataList,
                className: kv.valueError ? 'inp-error' : ''
            }
            let inputs = this.getInputs(kv, index, keyInputProps, valueInputProps)
            return (
                <div className={rowClasses} key={index}>
                    <div className={okSignClasses} onClick={()=>{this.toggle(index, kv)}}></div>
                    {inputs}
                    <div className="glyphicon glyphicon-remove" onClick={()=>{this.remove(index)}}></div>
                </div>
            )
        })
        let kvClasses = classNames({
            'mod-kv': true
        })
        return (
            <div className={kvClasses}>
                {nodes}
            </div>
        )
    }

    getInputs(kv, rowIndex, keyInputProps, valueInputProps) {
        return (
            <div className="input-wrap" onFocus={(e)=>{this.focus(rowIndex,e)}} onBlur={(e)=>{this.blur(e)}}>
                <input {...keyInputProps} />
                <input {...valueInputProps}/>
            </div>
        )
    }

    getXColumn(kv, rowIndex) {
        // for extend column use
    }

    toggle(rowIndex, kv) {
        this.props.toggleKV(rowIndex, kv)
    }

    focus(rowIndex, evt) {
        if (rowIndex === this.props.kvs.length - 1) {
            this.props.addKV(rowIndex)
        }
        evt.currentTarget.classList.add('active')
    }

    blur(evt) {
        evt.currentTarget.classList.remove('active')
    }

    remove(rowIndex) {
        this.props.removeKV(rowIndex)
    }

    changeKey(evt, rowIndex, kv) {
        kv.keyError = false
        this.props.changeKVKey(rowIndex, evt.target.value)
    }

    changeValue(evt, rowIndex, kv) {
        kv.valueError = false
        this.props.changeKVValue(rowIndex, evt.target.value)
    }

}


export default KeyValue