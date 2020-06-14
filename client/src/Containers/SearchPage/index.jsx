import React from 'react'
import {connect} from 'react-redux';
import reducer from '../../Reducers'

const SearchPage=(props)=>{
    return (
        <div>
        {search && isLoading && (<NetworkSpinner
          method={"post"}
          url={SEARCH_URL}
          body={search}
          />)}
          <ResponsiveSearchBox tags={tags_hardcoded} Search={function(obj){
            setSearchTerm(obj);
            toggleLoading(true);
          }}/>
          {search && <p>{JSON.stringify(search)}</p>}
    
        </div>
      )
}


const stateToProps = state =>({
    searchState:state.searchState
})

const dispatchToProps = ()=>dispatch=>({
    
})

export default connect(stateToProps,dispatchToProps)(SearchPage);