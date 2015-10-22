//author @huntbao
'use strict'

import './index.styl'
import ReactDOM from 'react-dom'
import Search from './components/search/search.jsx'
import SideTab from './components/sidetab/sidetab.jsx'
import History from './components/history/history.jsx'
import Collections from './components/collections/collections.jsx'

const sideContainer = document.getElementById('side')
const modSearch = sideContainer.querySelector('.mod-search')
const modTab = sideContainer.querySelector('.mod-tab')
const modHistory = sideContainer.querySelector('.mod-history')
const modCollections = sideContainer.querySelector('.mod-collections')

ReactDOM.render(<Search />, modSearch)
ReactDOM.render(<SideTab />, modTab)
ReactDOM.render(<History />, modHistory)
ReactDOM.render(<Collections />, modCollections)
