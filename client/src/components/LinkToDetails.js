/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';
import {Button} from "@material-ui/core";
// import {Link} from "react-router-dom";

function LinkToDetails(props){
  const hidden =css`
  position: absolute;
  left: -9999px;
  `
  const copyToClipboard = () =>{
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");

    var tooltip = document.getElementById("myTooltip");
    tooltip.textContent = "Copied!"
    console.log("copied!");
  }
  const copytext = css`
    position: relative;
    display: inline-block;
    left: 40%;

    p{
      background-color: rgba(216,216,216,0.2)
    }


   .tooltiptext {
    visibility: hidden;
    width: 140px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
     top: 150%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .tooltiptext::before {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  `

  const stickybutton = css`
      position: fixed;
      top: 0px;
      width:100vw;
      height: 15px;

      a{
        text-decoration: none;
      }
    `;
  if(props.ids.length){
    return (
      <div css={stickybutton}>
      {/*ALERT, IN PRODUCTION WE NEED TO REMOVE THE LOCALHOST:5000 part.*/}
      <input type="text" readOnly css={hidden} value={`${window.location.protocol}//${window.location.host}/render/posts?dump=${props.ids.join(",")}`} id="myInput" />
    <Button type="button"  onClick={copyToClipboard} css={copytext}>
      <p>Share <br /> {props.ids.length} posts with a friend!</p>
          <span className="tooltiptext" id="myTooltip">Copy to clipboard</span>
        </Button>

      </div>
    )
  }
  else{
    return(<div></div>)
  }
}

export default LinkToDetails
