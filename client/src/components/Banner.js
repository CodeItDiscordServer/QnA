/** @jsx jsx */
/* @jsxFrag React.Fragment */

import React from "react";
import {css,jsx} from "@emotion/core"

function Banner(props){
  
  const header = css`
    margin:auto;
    self-align:center;
    background-color:rgba(0,0,0,0.78);
    align-text:center;
    color:white;
    width:100vw;
    font-size:30px
  `;
  
  const name = css`
    padding:15px
  `;
  return (<div  css={header}>
  <div css={name}>QnA</div>
  </div>)
}

export default Banner;
