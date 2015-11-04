//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import Ace from 'brace'
import Util from '../../libs/util'
import SideTabAction from '../../actions/sidtabaction'
import SideTabStore from '../../stores/sidetabstore'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqBodyAction from '../../actions/reqbodyaction'
import ResAction from '../../actions/resaction'
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
        SideTabAction.fetchCollections()
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
                <h1>Phosphorus</h1>

                <div className="side">
                    <Search />
                    <SideTab tabs={this.state.sideTab.tabs}/>
                    <History tabs={this.state.sideTab.tabs} histories={this.state.sideTab.histories}/>
                    <Collections tabs={this.state.sideTab.tabs} collections={this.state.sideTab.collections}/>
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
            ReqTabConAction.toggleMethodList()
        }
        if (appStates.reqTabCon.reqCons[tabIndex].showBodyRawTypeList) {
            ReqBodyAction.toggleRawTypeList()
        }
        if (appStates.reqTabCon.reqCons[tabIndex].showResPrettyTypeList) {
            ResAction.toggleResPrettyTypeList()
        }
    }

    onChangeEditorText(text) {
        ReqBodyAction.changeBodyRawData(text)
    }

    updateAceEditor() {
        let appStates = this.getAppStates()
        let tabIndex = appStates.reqTab.activeIndex
        let aceEditorConfig = this.state.reqTabCon.reqCons[tabIndex].aceEditorConfig
        if (!aceEditorConfig.show) return
        let builders = this.state.reqTabCon.reqCons[tabIndex].builders
        let aceEditor = Ace.edit(this.state.reqTabCon.aceEditorId)
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

}


export default Index
