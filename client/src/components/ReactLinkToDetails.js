/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import { useContext } from 'react';
import {PostsSelected4Details} from '../Containers/SearchPage/SearchPageContext'
import {Link} from "react-router-dom"
import { connect } from 'react-redux';
import { SelectedPosts } from '../Reducers';
import {ClearList} from '../Actions/DetailedView'
// import {Link} from "react-router-dom";

const stateToProps = state=> {
  return {
  selectedPosts :SelectedPosts(state)
}}

const dispatchToProps = {
  ClearList
}

function LinkToDetails(props){
  // let selectedPosts = useContext(PostsSelected4Details);
  let selectedPosts = props.selectedPosts;
  const stickybutton = css`
    background-color: #A0A0A0;
    text-color: #fff;
    padding:10px;
    border-radius: 25%;
      position: fixed;
      top: 30px;
      right: 0px;
      a{
        text-decoration: none;
      }
    `;
    console.log(selectedPosts.length)
  if(selectedPosts.length){
    return (
      <div css={stickybutton}>
      {/*ALERT, IN PRODUCTION WE NEED TO REMOVE THE LOCALHOST:5000 part.*/}
      <button onClick={()=>{
          props.ClearList();
        }}>
          Clear
        </button>
        <Link to="/details">View details <br />of {selectedPosts.length} posts!</Link>
        
      </div>
    )
  }
  else{
    return(<div></div>)
  }
}

export default connect(stateToProps,dispatchToProps)(LinkToDetails);
