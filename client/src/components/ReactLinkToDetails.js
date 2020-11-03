/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import {Link} from "react-router-dom"
// import {Link} from "react-router-dom";

function LinkToDetails(props){
  const stickybutton = css`
      position: fixed;
      top: 30px;
      right: 0px;
      a{
        text-decoration: none;
      }
    `;
  if(props.selected.length){
    return (
      <div css={stickybutton}>
      {/*ALERT, IN PRODUCTION WE NEED TO REMOVE THE LOCALHOST:5000 part.*/}
        <Link to="/details">View details <br />of {props.selected.length} posts!</Link>
      </div>
    )
  }
  else{
    return(<div></div>)
  }
}

export default LinkToDetails
