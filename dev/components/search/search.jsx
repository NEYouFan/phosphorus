//author @huntbao
'use strict'
import './search.styl'
import React from 'react'

let Search = React.createClass({

    render: function () {
        return (
            <div className="mod-search">
                <input type="search" placeholder="Search"/>
            </div>
        )
    }

})


export default Search