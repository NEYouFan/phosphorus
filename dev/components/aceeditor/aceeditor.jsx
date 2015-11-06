//author @huntbao
'use strict'
import './aceeditor.styl'
import React from 'react'
import Ace from 'brace'
import classNames from 'classnames'
import textMode from 'brace/mode/text'
import jsonMode from 'brace/mode/json'
import javascriptMode from 'brace/mode/javascript'
import xmlMode from 'brace/mode/xml'
import htmlMode from 'brace/mode/html'
import searchBox from 'brace/ext/searchbox'
import ReqBodyAction from '../../actions/reqbodyaction'
import Util from '../../libs/util'

class AceEditor extends React.Component {

    static update(appStates) {
        let tabIndex = appStates.reqTab.activeIndex
        let aceEditorConfig = appStates.reqTabCon.reqCons[tabIndex].aceEditorConfig
        if (!aceEditorConfig.show) return
        let builders = appStates.reqTabCon.reqCons[tabIndex].builders
        let aceEditor = Ace.edit(appStates.reqTabCon.aceEditorId)
        let text
        if (aceEditorConfig.readOnly) {
            aceEditor.setOption('readOnly', true)
            let resShowType = builders.resShowType
            text = builders.fetchResponseData
            if (resShowType.type === 'Pretty') {
                if (!text) {
                    if (resShowType.prettyType === 'JSON') {
                        try {
                            text = JSON.stringify(JSON.parse(builders.fetchResponseRawData), null, '\t')
                        } catch (err) {
                            text = err.message
                        }
                    } else {
                        text = builders.fetchResponseRawData
                    }
                }
            } else {
                text = builders.fetchResponseRawData
            }
        } else {
            text = builders.bodyRawData
            aceEditor.setOption('readOnly', false)
        }
        aceEditor.getSession().setMode('ace/mode/' + aceEditorConfig.mode)
        // this function will trigger editor's change event
        aceEditor.setValue(text, -1)
    }

    componentDidMount() {
        this.editor = Ace.edit(this.props.id)
        this.editor.$blockScrolling = Infinity
        this.editor.on('input', () => {
            this.onChange()
        })
    }

    componentDidUpdate() {
        this.editor.getSession().setMode('ace/mode/' + this.props.config.mode)
    }

    render() {
        let classes = classNames({
            'mod-brace-editor': true,
            'hide': !this.props.config.show
        })
        return (
            <div className={classes}>
                <div id={this.props.id}></div>
                <div className="toggle-wrapping" title="Toggle wrapping"
                     onClick={(e)=>{this.toggleWrapping(e)}}>
                    <span className="glyphicon glyphicon-indent-right"></span>
                </div>
                <div className="copy-icon" title="Copy editor's text"
                     onClick={(e)=>{this.copy(e)}}>
                    <span className="glyphicon glyphicon-copy"></span>
                </div>
                <div className="search-in-editor" title="Search in editor"
                     onClick={(e)=>{this.searchInEditor(e)}}>
                    <span className="glyphicon glyphicon-search"></span>
                </div>
                <div className="json-format" title="Format to JSON"
                     onClick={(e)=>{this.formatJSON(e)}}>
                    <span className="glyphicon glyphicon-transfer"></span>
                </div>
            </div>
        )
    }

    onChange() {
        this.props.onChange(this.editor.getValue())
    }

    toggleWrapping(evt) {
        evt.currentTarget.classList.toggle('active')
        let wrapMode = this.editor.getSession().getUseWrapMode()
        this.editor.getSession().setUseWrapMode(!wrapMode)
    }

    searchInEditor(evt) {
        this.editor.execCommand('find')
    }

    copy(evt) {
        Util.copyToClipboard(this.editor.getValue())
    }

    formatJSON(evt) {
        try {
            this.editor.setValue(JSON.stringify(JSON.parse(this.editor.getValue()), null, '\t'), -1)
        } catch (err) {
            // do nothing
        }
    }
}

export default AceEditor
