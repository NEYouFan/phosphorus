//author @huntbao
'use strict'

import './index.styl'
import React from 'react'
import Util from '../../libs/util'
import SideTabAction from '../../actions/sidtabaction'
import SideTabStore from '../../stores/sidetabstore'
import ReqTabStore from '../../stores/reqtabstore'
import ReqTabConStore from '../../stores/reqtabconstore'
import ModalStore from '../../stores/modalstore'
import ReqTabConAction from '../../actions/reqtabconaction'
import ReqBodyAction from '../../actions/reqbodyaction'
import ResAction from '../../actions/resaction'
import ReqTabAction from '../../actions/reqtabaction'
import Search from '../search/search.jsx'
import SideTab from '../sidetab/sidetab.jsx'
import History from '../history/history.jsx'
import Collections from '../collections/collections.jsx'
import ReqTab from '../reqtab/reqtab.jsx'
import ReqTabCon from '../reqtabcon/reqtabcon.jsx'
import ReqHeadersDataList from '../reqheadersdatalist/reqheadersdatalist.jsx'
import MediaTypesDataList from '../mediatypesdatalist/mediatypesdatalist.jsx'
import AceEditor from '../aceeditor/aceeditor.jsx'
import Modal from '../modal/modal.jsx'

class Index extends React.Component {

    constructor(props) {
        super(props)
        this.state = this.getAppStates()
    }

    getAppStates() {
        return Object.assign({}, SideTabStore.getAll(), ReqTabStore.getAll(), ReqTabConStore.getAll(), ModalStore.getAll())
    }

    componentDidMount() {
        ModalStore.addChangeListener(()=> {
            this.onChange()
        })
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
        ModalStore.removeChangeListener(()=> {
            this.onChange()
        })
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
        let sideTab = this.state.sideTab
        let sideTabs = sideTab.tabs
        let reqTab = this.state.reqTab
        let reqTabTabs = reqTab.tabs
        let reqTabCon = this.state.reqTabCon
        return (
            <div className="main-wrap" onClick={()=>{this.hideDropdownMenu()}}>
                <h1>Phosphorus</h1>

                <div className="side">
                    <Search />
                    <SideTab tabs={sideTabs}/>
                    <History tabs={sideTabs} histories={sideTab.histories}/>
                    <Collections sideTab={sideTab} reqTabs={reqTabTabs} activeReqTabIndex={reqTab.activeIndex}/>
                </div>
                <div className="bd">
                    <ReqTab
                        tabs={reqTabTabs}
                        activeIndex={reqTab.activeIndex}
                        />
                    <ReqTabCon
                        reqTabs={reqTabTabs}
                        activeTabIndex={reqTab.activeIndex}
                        tabCons={reqTabCon}
                        />
                    <AceEditor
                        onChange={(text)=>{this.onChangeEditorText(text)}}
                        id={reqTabCon.aceEditorId}
                        config={reqTabCon.reqCons[reqTab.activeIndex].aceEditorConfig}
                        />
                    <ReqHeadersDataList/>
                    <MediaTypesDataList/>
                </div>
                <Modal modal={this.state.modal}/>
            </div>
        )
    }

    onChange() {
        this.setState(this.getAppStates())
    }

    hideDropdownMenu() {
        let appStates = this.getAppStates()
        let tabIndex = appStates.reqTab.activeIndex
        let reqCon = appStates.reqTabCon.reqCons[tabIndex]
        if (reqCon.showReqMethodList) {
            ReqTabConAction.toggleMethodList()
        }
        if (reqCon.showBodyRawTypeList) {
            ReqBodyAction.toggleRawTypeList()
        }
        if (reqCon.showResPrettyTypeList) {
            ResAction.toggleResPrettyTypeList()
        }
    }

    onChangeEditorText(text) {
        ReqBodyAction.changeBodyRawData(text)
        this.checkIfSetDirty()
    }

    updateAceEditor() {
        AceEditor.update(this.getAppStates())
    }

    checkIfSetDirty() {
        let tabIndex = this.state.reqTab.activeIndex
        let builders = this.state.reqTabCon.reqCons[tabIndex].builders
        if (builders.bodyRawDataOriginal !== builders.bodyRawData) {
            ReqTabAction.setDirtyTab()
        }
    }

}


export default Index
