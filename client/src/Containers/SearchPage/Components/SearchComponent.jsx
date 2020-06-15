import React from 'react'
import NetworkSpinner from "../../../components/NetworkSpinner.js"
const SEARCH_URL = "/api/search";

const SearchBox = (props)=>{
  const {searchResults, isLoading} = props;
  const [search,setSearchTerm] = React.useState(null);
  const [isLoading, toggleLoading] = React.useState(null);
    return (
        <div>
        {search && isLoading && (<NetworkSpinner
          method={"post"}
          url={SEARCH_URL}
          body={search}
          />)}
          <ResponsiveSearchBox tags={props.filters.tags} Search={function(obj){
            setSearchTerm(obj);
            toggleLoading(true);
          }}/>
          {search && <p>{JSON.stringify(search)}</p>}

        </div>
    )
}



const stateToProps = state =>({
    isLoading: state.search.isLoadingResults,
    searchResults: state.search.results;
})

const dispatchToProps = ()=>dispatch=>({

})

export default connect(stateToProps,dispatchToProps)(SearchBox);
