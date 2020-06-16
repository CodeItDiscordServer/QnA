import React from 'react'
import SearchBox from './Components/SearchComponent'
import SearchResults from './Components/SearchResults'
import { Divider } from '@material-ui/core'
const SearchPage=(props)=>{
    return (
        <div className="SearchContainer">
          <SearchBox />
          <Divider variant="middle"/>
          <SearchResults />
        </div>
      )
}


export default SearchPage;