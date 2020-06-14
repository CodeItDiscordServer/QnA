import React from 'react'

const SearchBox = (props)=>{
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
    isLoading:methods.isSearchPageLoading(state),
    searchResults:methods.searchResults(state)
})

const dispatchToProps = ()=>dispatch=>({
   
})

export default connect(stateToProps,dispatchToProps)(SearchBox);

