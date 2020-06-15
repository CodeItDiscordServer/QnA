import React from 'react'
import SearchBox from './Components/SearchComponent'
import SearchResults from './Components/SearchResults'

const SearchPage=(props)=>{
    return (
        <div className="SearchContainer">
          <SearchBox />
          <SearchResults />
        </div>
      )
}


export default SearchPage;