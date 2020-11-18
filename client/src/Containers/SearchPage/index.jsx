import React from "react"
import { Divider } from '@material-ui/core'

import SearchResults from './Components/SearchResults'
import SearchBox from './Components/SearchComponent'
import LinkToDetails from "../../components/ReactLinkToDetails.js";


const SearchPage=(props)=>{
    return (
        <div className="SearchContainer">
          <SearchBox />
          <Divider variant="middle"/>
          {/* We have a context Provider
            to hold the local state of the each active post.*/}

                <LinkToDetails  />
                <SearchResults />

        </div>
      )
}


export default SearchPage;
