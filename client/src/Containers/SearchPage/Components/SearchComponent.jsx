import React from 'react'
import NetworkSpinner from "../../../components/NetworkSpinner.js"
import ResponsiveSearchBox from '../../../components/ResponsiveSearchBox'
import {connect} from 'react-redux'
import {search,updateTags,updateSearchText} from '../../../Actions/searchActions'
import {isSearchPageLoading} from '../../../Reducers/index'
import {} from '@material-ui/core'
const SEARCH_URL = "/api/search";

const stateToProps = state =>({
  isLoading: isSearchPageLoading(state),
  searchResults: state.search.results,
  filters:state.search.filters
})

const dispatchToProps = {
  Search:search,
  updateTags,
  updateSearchText

}

const SearchBox = (props)=>{
  const {searchResults, isLoading} = props;
  const [search,setSearchTerm] = React.useState(null);
  const [toggleLoading] = React.useState(null);
    return (
        <div>
          
          {/* {search && !isLoading && (<NetworkSpinner
            method="post"
            url={SEARCH_URL}
            body={search}
            />)} */}
          
          <ResponsiveSearchBox 
              loading={props.isLoading} filters={props.filters}
              Search={props.Search} updateTags = {props.updateTags} 
              updateSearchText = {props.updateSearchText}
              />

          {search && <p>{JSON.stringify(search)}</p>}

        </div>
    )
}



export default connect(stateToProps,dispatchToProps)(SearchBox);
