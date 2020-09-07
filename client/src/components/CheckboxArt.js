/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';

const checkStylez = css`
img {
  width: 25px;
  height: 25px;
  display: inline-block;
}
margin-right: 6px;
font-size: 1.25em;
`;

export const MissingCheckbox = (props)=>{
  const {term} = props;

  return (
    <span css={checkStylez}>
      <img src="/static/negative-check.png"
          alt="This search term was not found in the result"/>
      {term}
    </span>
  )
}



export const GoodCheckbox = (props)=>{
  const {term} = props;

  return (
    <span css={checkStylez}>
      <img src="/static/positive-check.png"
          alt="This search term was found!"/>
      {term}
    </span>
  )
}
