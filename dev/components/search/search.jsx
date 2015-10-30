//author @huntbao
'use strict'
import './search.styl'
import React from 'react'

class Search extends React.Component{

    render () {
        return (
            <div className="mod-search">
                <input type="search" placeholder="Search"/>
            </div>
        )
    }

}


export default Search