/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import {Component} from "react"
import { css, jsx } from '@emotion/core';
import {connect} from 'react-redux'
import {Card} from "@material-ui/core"

// import React from 'react';
// import { Paper,Card,CardHeader,CardContent } from '@material-ui/core'
import {isInfiniteLoading,getCursor,searchResults,SearchPageFilters, SelectedPosts} from '../../../Reducers/index.js'
import {GoodCheckbox,MissingCheckbox} from "../../../components/CheckboxArt.js"
import {InfiniteScroll, AddOrRemoveToSelectedPosts} from '../../../Actions/searchActions'
import InfiniteScrollAlert from "../../../components/InfiniteScrollAlert.js"
import {PostsSelected4Details} from "../SearchPageContext.js"


const stateToProps = state => {
  return {
    isLoading: isInfiniteLoading(state),
    searchResults: searchResults(state),
    filters: SearchPageFilters(state),
    cursor: getCursor(state),
    selectedPosts:SelectedPosts(state)
  }
}

const dispatchToProps = {
  InfiniteScroll,
  SelectPost: AddOrRemoveToSelectedPosts
};

// not to remove your code luffy sorry i jsut needed to used
// component did mount and component willupdate
class SearchResults extends Component{

  constructor(){
    super();
    this.scrollListener = this.scrollListener.bind(this)

  }

  componentDidMount(){
    window.addEventListener("scroll",this.scrollListener)
  }
  componentWillUnmount(){
    window.removeEventListener("scroll",this.scrollListener)
  }

  scrollListener(){
    // console.log(this.props.isLoading);
      if(this.props.searchResults.length && !this.props.isLoading){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            //search agin with the filters and also the mongodb id of the last element
            //to continue
               this.props.InfiniteScroll(this.props.filters,
                          this.props.cursor)
           }
      }
  }

  render(){
    let results = this.props.searchResults;
    let selectPost= this.props.SelectPost;
    let selectedPosts = this.props.selectedPosts;
    return (

          <div>
            {results !== undefined && !results && <h3>zero search results</h3>}
             {results && results.map(function(result,index){
               return (<ResultCard selected={selectedPosts.includes(result.id)} SelectPost = {selectPost}  key={`result-${index}`} topic = {result}/>)
             })}
             {this.props.isLoading && <InfiniteScrollAlert />}
           </div>
    )
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
  return (<div css={style}>
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

  return (<div key={`meta-result-${term}-${unique}`}>

    {dict[term].length  ? dict[term].map(function(short,index){

      let content = short[0].replace(term,`<b>${term}</b>`)
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
  let tags = topic.tags;
  // let tagString = "";
  // tagString+=tags[tag]+"\t\t\t\t"; // defined but never used
  let tagsList = [];
  const TagsView =  props =>{
      return <span css={tagsStyle}>{props.text}</span>
  }
  const GoodThing = props =>{
    return (<span css={goodthingStyle}>{props.text} +{props.hits}</span>)
  }

  tags.forEach(function(tag){
    tagsList.push((<TagsView key={`tags-${tag}`} text={tag} />))
  })

  if(topic["good-q"]){
    tagsList.push(<GoodThing key={`good-question-${topic.created}`}
                    text={"Good Question"} hits={topic["good-q"]} />)
  }
  if(topic["good-a"]){
    tagsList.push(<GoodThing key={`good-answer-${topic.created}`}
                    text={"Good Answer"} hits={topic["good-a"]} />)
  }

  return (
    <div style={{padding:"5px"}}>{tagsList}</div>
  )
}



function ResultCard(props){
    let topic = props.topic;
    let title = topic.post.subject;
    // let question = topic.history[0].content;


    const subjectStyle =css`
      font-weight: bold;
      padding: 15px;
      color: #007FC7;
      font-size: 1.3em;
    `;
    const isSelectedStyle=css`
     border: 1px solid #007fc7;
    `;


    return (
      <PostsSelected4Details.Consumer>
        { ({update}) =>
          (<div onClick={()=>{
            props.SelectPost(topic.id);
            console.log("Clicked")
            // alert(topic.id)
            }}>
            <Card

                 css={props.selected && isSelectedStyle}
                 elevation={1.0}
                 style={{marginLeft:"70px",marginRight:"70px",marginBottom:"20px",padding:"20px"}}
                 >
                {tagsView(topic)}
                {topic.summariez && searchTermsPresent(topic.summariez,topic.date)}
                <div dangerouslySetInnerHTML={{__html:title}} css={subjectStyle}></div>
                <hr/>
                {topic.summariez && Object.keys(topic.summariez).map(function(term){
                  return metaresult(term,topic.summariez,topic.created);
                })}

            </Card>
            </div>
          )
        }
      </PostsSelected4Details.Consumer>
    );

}



export default connect(stateToProps,dispatchToProps)(SearchResults);
