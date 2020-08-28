import React from 'react';
import { Paper } from '@material-ui/core'
import {isSearchPageLoading,searchResults} from '../../../Reducers/index.js'
import {connect} from 'react-redux'

const stateToProps = state =>({
    isLoading: isSearchPageLoading(state),
    searchResults:searchResults(state)
});

const dispatchToProps = {

};

const SearchResults = props =>{
    let results = props.searchResults;

    if(results !==undefined){
        let resultsView = [];
        if(results.length!==0){
            for(let id in results){
                let question = results[id]
                resultsView.push(<Paper elevation={0} color={"red"}>{question.id}</Paper>)
            }
            
        }
        else{
            resultsView.push(<h3>zero search results</h3>)
        }
        return resultsView;
        
    }
    
    return <h3>Search please</h3>
}

export default connect(stateToProps,dispatchToProps)(SearchResults);