/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Paper,Card,CardHeader,CardContent } from '@material-ui/core'
import {isSearchPageLoading,searchResults} from '../../../Reducers/index.js'
import {connect} from 'react-redux'

const tagsStyle = css`
padding:10px;
font-weight:600;
font-size:1.0em;
color:#4AC16C;
`

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
                resultsView.push(<ResultCard topic = {results[id]}/>)
            }
            
        }
        else{
            resultsView.push(<h3>zero search results</h3>)
        }
        return resultsView;
        
    }
    
    return <h3>Search please</h3>
}

function ResultCard(props){
    let topic = props.topic;
    let title = topic.history[0].subject;
    let question = topic.history[0].content;
    let tags = topic.tags;
    let tagString = "";
    let tagsList = [];
    for(let tag in tags){
        tagString+=tags[tag]+"\t\t\t\t";
        tagsList.push(<TagsView text={tags[tag]} />)
    }
    
    return (<Card elevation={1.0} style={{marginLeft:"70px",marginRight:"70px",padding:"20px"}}>
        <div style={{padding:"5px"}}>{tagsList}</div>
        
        <div dangerouslySetInnerHTML={{__html:title}} style={{fontWeight:"bold",padding:"15px",color:"#007FC7",fontSize:"1.3em"}}></div>
        <hr/>
        <div dangerouslySetInnerHTML={{__html:question}} style={{paddingLeft:"15px",fontFamily:"Roboto",fontSize:"1.1em",color:"#444"}}></div>
        
    </Card>)
    
}


const TagsView =  props =>{
    return <span css={tagsStyle}>{props.text}</span>
}
export default connect(stateToProps,dispatchToProps)(SearchResults);


