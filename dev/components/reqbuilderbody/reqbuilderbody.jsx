//author @huntbao
'use strict'
import './reqbuilderbody.styl'
import React from 'react'
import classNames from 'classnames'
import DropDownMenu from '../dropdownmenu/dropdownmenu.jsx'
import ReqBodyAction from '../../actions/reqbodyaction'

/** @namespace this.props.showRawTypeList */
let ReqBuilderBody = React.createClass({

    render() {
        let bodyType = this.props.builders.bodyType
        let typeNodes = this.props.bodyTypes.map((type, index) => {
            let isChecked = type === bodyType.name
            let rawTypeClasses = classNames({
                'reqbuilder-body-rawtype': true,
                'show-value': isChecked,
                'show-list': this.props.showRawTypeList
            })
            return (
                <li key={index}>
                    <label>
                        <input type="radio" value={type} name="type" checked={isChecked} onChange={this.onChange}/>
                        <span>{type}</span>
                    </label>
                    {type === 'raw' ?
                        <span className={rawTypeClasses}>
                            <span className="rawtype-wrap" onClick={this.toggleRawTypeList}>
                                <span className="rawtype-name">{bodyType.value}</span>
                                <span className="glyphicon glyphicon-chevron-down"></span>
                            </span>
                            <DropDownMenu
                                menus={this.props.rawTypes}
                                onClickItem={this.onSelectRawType}
                                />
                        </span>
                        : ''}
                </li>
            )
        })

        let modClassName = classNames({
            hide: this.props.builders.activeIndex !== 1
        })

        return (
            <div className={modClassName}>
                <div className="mod-reqbuilder-body">
                    <form>
                        <ol className="type-tabs">{typeNodes}</ol>
                    </form>
                </div>
            </div>
        )
    },

    onChange(evt) {
        ReqBodyAction.changeBodyType(this.props.tabIndex, evt.target.value)
    },

    toggleRawTypeList(evt) {
        evt.stopPropagation()
        ReqBodyAction.toggleRawTypeList(this.props.tabIndex)
    },

    onSelectRawType(bodyTypeValue) {
        ReqBodyAction.changeBodyTypeValue(this.props.tabIndex, bodyTypeValue)
    }

})


export default ReqBuilderBody