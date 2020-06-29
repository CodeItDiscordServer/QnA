import React from 'react'
import {connect} from 'react-redux';
import { LinearProgress } from "@material-ui/core"


import ResponsiveSearchBox from './ResponsiveSearchBox'
import {SearchSequence,set_filter} from '../../../Actions/searchActions'
import {isSearchPageLoading,SearchPageFilters} from '../../../Reducers/index.js'




const SEARCH_URL = "/api/search";
// BagOfThreads: state.search.results,

const stateToProps = state =>({
  isLoading: isSearchPageLoading(state),
  filters: SearchPageFilters(state)
})

const dispatchToProps = {
  SearchSequence,
  set_filter
}

const SearchBox = (props)=>{
  const {isLoading, filters} = props;

    return (
        <div>
          {/*Since we are no longer doing
            http in the component but rather
            searchActions.js, wand not networokspinner*/}
           {isLoading && (<LinearProgress />)}

          <ResponsiveSearchBox
              loading={props.isLoading} filters={filters}
              SearchSequence={props.SearchSequence} updateFilter={props.set_filter}
              />

          {filters && <p>{JSON.stringify(filters)}</p>}

        </div>
    )
}



export default connect(stateToProps,dispatchToProps)(SearchBox);
