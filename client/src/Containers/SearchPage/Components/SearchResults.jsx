/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import {connect} from 'react-redux'
import {Card} from "@material-ui/core"

// import React from 'react';
// import { Paper,Card,CardHeader,CardContent } from '@material-ui/core'
import {isSearchPageLoading,searchResults} from '../../../Reducers/index.js'
import {GoodCheckbox,MissingCheckbox} from "../../../components/CheckboxArt.js"


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
    else{
      return (<div></div>)
    }

}


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;                 ;;;;;;;;;;;;;;
//;;;;;;;;;;;;;;;; Helper functions;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;                 ;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

function searchTermsPresent(summariez,unique){
  let style =css`
  margin-left: 25px;
  color: grey;
  `;
  return (<div>
      {Object.keys(summariez).map(function(term){
      if(summariez[term].length){
        return <GoodCheckbox key={`good-term-${term}-${unique}`} term={term} />
      }
      else{
        return <MissingCheckbox key={`missing-term-${term}-${unique}`} term={term} />
      }

    })}
    </div>)
}


/* helper function to display short summaries of each keyw

*/
function metaresult(term,dict,unique){
  const paraStyle=css`
  padding-left: 15px;
  font-family: Roboto;
  font-size:1.1em;
  color: #444;
  `;
  const subjectStyle =css`
    font-weight: bold;
    padding: 15px;
    color: cornflowerblue;
    font-size: 1.15em;
  `
  return (<div key={`meta-result-${term}-${unique}`}>

    {dict[term].length ? dict[term][0].map(function(short,index){

      let content = short.replace(term,`<b>${term}</b>`)
      return (
        <span key={`${term}-result-${index}`} css={paraStyle} dangerouslySetInnerHTML={{__html:`...${content}...`}}></span>
      )
    }) : ""}
  </div>);



}
/* display the tags, the folders this answer appears in,
good question good answer remarks
*/
function tagsView(topic){
  const tagsStyle = css`
    padding:10px;
    font-weight:600;
    font-size:1.0em;
    color:#E9C300;`;
  const goodthingStyle = css`
    padding:10px;
    font-weight:600;
    font-size:1.0em;
    color:#4AC16C;`;
  let tags = topic.folders;
  // let tagString = "";
  // tagString+=tags[tag]+"\t\t\t\t"; // defined but never used
  let tagsList = [];
  const TagsView =  props =>{
      return <span css={tagsStyle}>{props.text}</span>
  }
  const GoodThing = props =>{
    return (<span css={goodthingStyle}>{props.text} +{props.hits}</span>)
  }

  for(let tag in tags){
      tagsList.push((<TagsView key={`tags-${tags[tag]}`} text={tags[tag]} />))
  }
  if(topic.tag_good_arr.length){
    tagsList.push(<GoodThing key={`good-question-${topic.created}`}
                    text={"Good Question"} hits={topic.tag_good_arr.length} />)
  }
  var goodanswer = 0;
  for(var i=0;i<Math.min(2,topic.children.length);i++){
    if(topic.children[i].tag_endorse_arr && topic.children[i].tag_endorse_arr.length){
      goodanswer+=topic.children[i].tag_endorse_arr.length;
    }
  }
  if(goodanswer){
    tagsList.push(<GoodThing key={`good-answer-${topic.created}`}
                    text={"Good Answer"} hits={goodanswer} />)
  }

  return (
    <div style={{padding:"5px"}}>{tagsList}</div>
  )
}



function ResultCard(props){
    let topic = props.topic;
    let title = topic.history[0].subject;
    // let question = topic.history[0].content;


    const subjectStyle =css`
      font-weight: bold;
      padding: 15px;
      color: #007FC7;
      font-size: 1.3em;
    `


    return (<Card elevation={1.0} style={{marginLeft:"70px",marginRight:"70px",marginBottom:"20px",padding:"20px"}}>
        {tagsView(topic)}
        {searchTermsPresent(topic.summariez,topic.created)}
        <div dangerouslySetInnerHTML={{__html:title}} css={subjectStyle}></div>
        <hr/>
        {topic.summariez && Object.keys(topic.summariez).map(function(term){
          return metaresult(term,topic.summariez,topic.created);
        })}

    </Card>)

}



export default connect(stateToProps,dispatchToProps)(SearchResults);
