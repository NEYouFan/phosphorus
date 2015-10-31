//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import Ace from 'brace'
import SideTabStore from '../../stores/sidetabstore'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqBodyAction from '../../actions/reqbodyaction'
import Search from '../search/search.jsx'
import SideTab from '../sidetab/sidetab.jsx'
import History from '../history/history.jsx'
import Collections from '../collections/collections.jsx'
import ReqTab from '../reqtab/reqtab.jsx'
import ReqTabCon from '../reqtabcon/reqtabcon.jsx'
import ReqHeadersDataList from '../reqheadersdatalist/reqheadersdatalist.jsx'
import MediaTypesDataList from '../mediatypesdatalist/mediatypesdatalist.jsx'
import AceEditor from '../aceeditor/aceeditor.jsx'

class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.getAppStates()
    }

    getAppStates() {
        return Object.assign({}, SideTabStore.getAll(), ReqTabStore.getAll(), ReqTabConStore.getAll())
    }

    componentDidMount() {
        SideTabStore.addChangeListener(()=> {
            this.onChange()
        })
        ReqTabStore.addChangeListener(()=> {
            this.onChange()
        })
        ReqTabConStore.addChangeListener(()=> {
            this.onChange()
        })
        ReqTabConStore.addAceEditorUpdateListener(()=> {
            this.updateAceEditor()
        })
    }

    componentWillUnmount() {
        SideTabStore.removeChangeListener(()=> {
            this.onChange()
        })
        ReqTabStore.removeChangeListener(()=> {
            this.onChange()
        })
        ReqTabConStore.removeChangeListener(()=> {
            this.onChange()
        })
        ReqTabConStore.removeAceEditorUpdateListener(()=> {
            this.updateAceEditor()
        })
    }

    render() {
        return (
            <div className="main-wrap" onClick={()=>{this.hideDropdownMenu()}}>
                <div className="side">
                    <Search />
                    <SideTab sideTab={this.state.sideTab}/>
                    <History sideTab={this.state.sideTab}/>
                    <Collections sideTab={this.state.sideTab}/>
                </div>
                <div className="bd">
                    <ReqTab
                        tabs={this.state.reqTab.tabs}
                        activeIndex={this.state.reqTab.activeIndex}
                        />
                    <ReqTabCon
                        reqTabs={this.state.reqTab.tabs}
                        activeTabIndex={this.state.reqTab.activeIndex}
                        tabCons={this.state.reqTabCon}
                        />
                    <AceEditor
                        onChange={(text)=>{this.onChangeEditorText(text)}}
                        id={this.state.reqTabCon.aceEditorId}
                        config={this.state.reqTabCon.reqCons[this.state.reqTab.activeIndex].aceEditorConfig}
                        />
                    <ReqHeadersDataList/>
                    <MediaTypesDataList/>
                </div>
            </div>
        )
    }

    onChange() {
        this.setState(this.getAppStates())
    }

    hideDropdownMenu() {
        let appStates = this.getAppStates()
        let tabIndex = appStates.reqTab.activeIndex
        if (appStates.reqTabCon.reqCons[tabIndex].showReqMethodList) {
            ReqTabConAction.toggleMethodList(tabIndex)
        }
        if (appStates.reqTabCon.reqCons[tabIndex].showBodyRawTypeList) {
            ReqBodyAction.toggleRawTypeList(tabIndex)
        }
    }

    onChangeEditorText(text) {
        ReqBodyAction.changeBodyRawData(text)
    }

    updateAceEditor() {
        // https://github.com/securingsincity/react-ace/blob/master/src/ace.jsx
        let appStates = this.getAppStates()
        let tabIndex = appStates.reqTab.activeIndex
        let text
        let aceEditorConfig = this.state.reqTabCon.reqCons[tabIndex].aceEditorConfig
        let aceEditor = Ace.edit(this.state.reqTabCon.aceEditorId)
        aceEditor.getSession().setMode('ace/mode/' + aceEditorConfig.mode)
        if (aceEditorConfig.readOnly) {
            aceEditor.setOption('readOnly', true)
            text = this.state.reqTabCon.reqCons[tabIndex].builders.fetchResponseData
        } else {
            text = this.state.reqTabCon.reqCons[tabIndex].builders.bodyRawData
        }
        aceEditor.setValue(text)
    }

}


export default Index
