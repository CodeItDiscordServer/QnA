/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
// import React from 'react';
// import { Paper,Card,CardHeader,CardContent } from '@material-ui/core'
import {Card} from "@material-ui/core"
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
          let count=0
            for(let id in results){
                resultsView.push(<ResultCard key={`result-${count}`} topic = {results[id]}/>)
                count++;
            }

        }
        else{
            resultsView.push(<h3>zero search results</h3>)
        }
        return resultsView;

    }

    return <h3>Search please</h3>
}
/* helper function to display short summaries of each

*/
function metaresult(term,dict){
  const paraStyle=css`
  padding-left: 15px;
  font-family: Roboto;
  font-size:1.1em;
  color: #444;
  `;
  const subjectStyle =css`
    font-weight: bold;
    padding: 15px;
    color: #007FC7;
    font-size: 1.3em;
  `
  return (<div>
    <p css={subjectStyle}>{term}</p>
    {dict[term].length ? dict[term][0].map(function(short,index){
      return (
        <p key={`${term}-result-${index}`} css={paraStyle}>{short}</p>
      )
    }) : ""}
  </div>);



}



function ResultCard(props){
    let topic = props.topic;
    let title = topic.history[0].subject;
    // let question = topic.history[0].content;
    let tags = topic.tags;
    // let tagString = "";
    // tagString+=tags[tag]+"\t\t\t\t"; // defined but never used
    let tagsList = [];
    for(let tag in tags){
        tagsList.push((<TagsView key={`tags-${tags[tag]}`} text={tags[tag]} />))
    }

    const subjectStyle =css`
      font-weight: bold;
      padding: 15px;
      color: #007FC7;
      font-size: 1.3em;
    `


    return (<Card elevation={1.0} style={{marginLeft:"70px",marginRight:"70px",padding:"20px"}}>
        <div style={{padding:"5px"}}>{tagsList}</div>
        <div dangerouslySetInnerHTML={{__html:title}} css={subjectStyle}></div>
        <hr/>
        {Object.keys(topic.summariez).map(function(term){
          return metaresult(term,topic.summariez);
        })}

    </Card>)

}


const TagsView =  props =>{
    return <span css={tagsStyle}>{props.text}</span>
}
export default connect(stateToProps,dispatchToProps)(SearchResults);
