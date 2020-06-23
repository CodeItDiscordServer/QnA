import React from 'react';
import { Paper } from '@material-ui/core'

const SearchResults = props =>{
    return (<Paper elevation={0}>{props.searchresults}</Paper>)
}

export default SearchResults;