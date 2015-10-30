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

class AceEditor extends React.Component {

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
            </div>
        )
    }

    onChange() {
        this.props.onChange(this.editor.getValue())
    }
}

export default AceEditor
