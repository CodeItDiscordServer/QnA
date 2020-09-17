/**  @jsx jsx */
/* @jsxFrag React.Fragment */
import { css, jsx } from '@emotion/core';

const checkStylez = css`
  img {
    width: 15px;
    height: 15px;
    display: inline-block;
  }
  margin: -2px 6px -10px 0;

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
