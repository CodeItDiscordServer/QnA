import React from 'react';
import { Paper } from '@material-ui/core'
import {connect} from 'react-redux';
import {searchResults} from '../../../Reducers/index.js'


const SearchResults = props =>{
    return (<Paper elevation={0}>{props.searchresults}</Paper>)
}

const stateToProps = state =>{
  console.log(searchResults(state));
  return {
    results: searchResults(state)

  }
}


export default connect(stateToProps,null)(SearchResults);
